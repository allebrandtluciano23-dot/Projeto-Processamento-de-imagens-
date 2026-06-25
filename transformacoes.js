function converterParaCinza(matriz) {
    if (!matriz) return null;

    const altura = matriz.length;
    const largura = matriz[0].length;
    const resultado = [];

    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            const gray = Math.round(0.299 * matriz[y][x][0] + 0.587 * matriz[y][x][1] + 0.114 * matriz[y][x][2]);
            resultado[y][x] = new Uint8ClampedArray([gray, gray, gray, matriz[y][x][3]]);
        }
    }

    return resultado;
}

function limiarizar(matriz, limiar) {
    if (!matriz) return null;

    const altura = matriz.length;
    const largura = matriz[0].length;
    const resultado = [];

    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            const gray = Math.round(0.299 * matriz[y][x][0] + 0.587 * matriz[y][x][1] + 0.114 * matriz[y][x][2]);
            const binary = gray >= limiar ? 255 : 0;
            resultado[y][x] = new Uint8ClampedArray([binary, binary, binary, matriz[y][x][3]]);
        }
    }

    return resultado;
}

function logicaBinaria(matriz1, matriz2, limiar, operacao) {
    if (!matriz1) return null;
    if (operacao !== 'NOT' && !matriz2) return null;
    if (operacao !== 'NOT' && (matriz1.length !== matriz2.length || matriz1[0].length !== matriz2[0].length))
        return null;

    const altura = matriz1.length;
    const largura = matriz1[0].length;
    const resultado = [];
    const bin1 = limiarizar(matriz1, limiar);
    const bin2 = matriz2 ? limiarizar(matriz2, limiar) : null;

    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            const v1 = bin1[y][x][0] === 255 ? 1 : 0;
            const v2 = bin2 ? (bin2[y][x][0] === 255 ? 1 : 0) : 0;
            let value = 0;

            switch (operacao) {
                case 'AND': value = v1 && v2 ? 255 : 0; break;
                case 'OR':  value = v1 || v2 ? 255 : 0; break;
                case 'XOR': value = (v1 ^ v2) ? 255 : 0; break;
                case 'NOT': value = v1 ? 0 : 255; break;
            }

            resultado[y][x] = new Uint8ClampedArray([value, value, value, matriz1[y][x][3]]);
        }
    }

    return resultado;
}

function negativo(matriz) {
    if (!matriz) return null;

    const altura = matriz.length;
    const largura = matriz[0].length;
    const resultado = [];

    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            resultado[y][x] = new Uint8ClampedArray([
                255 - matriz[y][x][0],
                255 - matriz[y][x][1],
                255 - matriz[y][x][2],
                matriz[y][x][3]
            ]);
        }
    }

    return resultado;
}

function equalizacaoHistograma(matriz) {
    if (!matriz) return null;

    const altura = matriz.length;
    const largura = matriz[0].length;
    const total = altura * largura;
    const hist = new Array(256).fill(0);
    const resultado = [];

    for (let y = 0; y < altura; y++) {
        for (let x = 0; x < largura; x++) {
            const gray = Math.round(0.299 * matriz[y][x][0] + 0.587 * matriz[y][x][1] + 0.114 * matriz[y][x][2]);
            hist[gray]++;
        }
    }

    const cdf = [];
    let acumulado = 0;
    for (let i = 0; i < 256; i++) {
        acumulado += hist[i];
        cdf[i] = Math.round((acumulado / total) * 255);
    }

    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            const gray = Math.round(0.299 * matriz[y][x][0] + 0.587 * matriz[y][x][1] + 0.114 * matriz[y][x][2]);
            const equalizado = cdf[gray];
            resultado[y][x] = new Uint8ClampedArray([equalizado, equalizado, equalizado, matriz[y][x][3]]);
        }
    }

    return resultado;
}

function inverterHorizontal(matriz) {
    if (!matriz) return null;

    const altura = matriz.length;
    const largura = matriz[0].length;
    const resultado = [];

    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            resultado[y][x] = matriz[y][largura - 1 - x];
        }
    }

    return resultado;
}

function inverterVertical(matriz) {
    if (!matriz) return null;

    const altura = matriz.length;
    const largura = matriz[0].length;
    const resultado = [];

    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            resultado[y][x] = matriz[altura - 1 - y][x];
        }
    }

    return resultado;
}

function diferencaImagens(matriz1, matriz2) {
    if (!matriz1 || !matriz2 || matriz1.length !== matriz2.length || matriz1[0].length !== matriz2[0].length)
        return null;

    const altura = matriz1.length;
    const largura = matriz1[0].length;
    const resultado = [];

    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            resultado[y][x] = new Uint8ClampedArray([
                Math.abs(matriz1[y][x][0] - matriz2[y][x][0]),
                Math.abs(matriz1[y][x][1] - matriz2[y][x][1]),
                Math.abs(matriz1[y][x][2] - matriz2[y][x][2]),
                Math.max(matriz1[y][x][3], matriz2[y][x][3])
            ]);
        }
    }

    return resultado;
}

function combinacaoLinear(matriz1, matriz2, alpha, beta) {
    if (!matriz1 || !matriz2 || matriz1.length !== matriz2.length || matriz1[0].length !== matriz2[0].length)
        return null;

    const altura = matriz1.length;
    const largura = matriz1[0].length;
    const resultado = [];

    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            resultado[y][x] = new Uint8ClampedArray([
                Math.round(alpha * matriz1[y][x][0] + beta * matriz2[y][x][0]),
                Math.round(alpha * matriz1[y][x][1] + beta * matriz2[y][x][1]),
                Math.round(alpha * matriz1[y][x][2] + beta * matriz2[y][x][2]),
                Math.max(matriz1[y][x][3], matriz2[y][x][3])
            ]);
        }
    }

    return resultado;
}

function mediaImagens(matriz1, matriz2) {
    return combinacaoLinear(matriz1, matriz2, 0.5, 0.5);
}
