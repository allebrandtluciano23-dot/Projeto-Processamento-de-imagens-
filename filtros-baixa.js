function maxFilter(matriz) {
    if (!matriz) return null;
    const altura = matriz.length;
    const largura = matriz[0].length;
    const resultado = [];
    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            const [r, g, b] = getNeighborhoodChannels(matriz, y, x);
            resultado[y][x] = new Uint8ClampedArray([Math.max(...r), Math.max(...g), Math.max(...b), matriz[y][x][3]]);
        }
    }
    return resultado;
}

function minFilter(matriz) {
    if (!matriz) return null;
    const altura = matriz.length;
    const largura = matriz[0].length;
    const resultado = [];
    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            const [r, g, b] = getNeighborhoodChannels(matriz, y, x);
            resultado[y][x] = new Uint8ClampedArray([Math.min(...r), Math.min(...g), Math.min(...b), matriz[y][x][3]]);
        }
    }
    return resultado;
}

function meanFilter(matriz) {
    if (!matriz) return null;
    const altura = matriz.length;
    const largura = matriz[0].length;
    const resultado = [];
    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            const [r, g, b] = getNeighborhoodChannels(matriz, y, x);
            resultado[y][x] = new Uint8ClampedArray([
                Math.round(r.reduce((a, v) => a + v, 0) / 9),
                Math.round(g.reduce((a, v) => a + v, 0) / 9),
                Math.round(b.reduce((a, v) => a + v, 0) / 9),
                matriz[y][x][3]
            ]);
        }
    }
    return resultado;
}

function medianFilter(matriz) {
    if (!matriz) return null;
    const altura = matriz.length;
    const largura = matriz[0].length;
    const resultado = [];
    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            const [r, g, b] = getNeighborhoodChannels(matriz, y, x);
            resultado[y][x] = new Uint8ClampedArray([
                r.sort((a, b) => a - b)[4],
                g.sort((a, b) => a - b)[4],
                b.sort((a, b) => a - b)[4],
                matriz[y][x][3]
            ]);
        }
    }
    return resultado;
}

function orderFilter(matriz, position) {
    if (!matriz) return null;
    const index = clamp(position - 1, 0, 8);
    const altura = matriz.length;
    const largura = matriz[0].length;
    const resultado = [];
    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            const [r, g, b] = getNeighborhoodChannels(matriz, y, x);
            resultado[y][x] = new Uint8ClampedArray([
                r.sort((a, b) => a - b)[index],
                g.sort((a, b) => a - b)[index],
                b.sort((a, b) => a - b)[index],
                matriz[y][x][3]
            ]);
        }
    }
    return resultado;
}

function gaussianFilter(matriz) {
    if (!matriz) return null;
    const altura = matriz.length;
    const largura = matriz[0].length;
    const kernel = [
        [1, 2, 1],
        [2, 4, 2],
        [1, 2, 1]
    ];
    const resultado = [];
    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            let sumR = 0, sumG = 0, sumB = 0, weight = 0;
            for (let j = -1; j <= 1; j++) {
                for (let i = -1; i <= 1; i++) {
                    const yy = clamp(y + j, 0, altura - 1);
                    const xx = clamp(x + i, 0, largura - 1);
                    const k = kernel[j + 1][i + 1];
                    const pixel = matriz[yy][xx];
                    sumR += pixel[0] * k;
                    sumG += pixel[1] * k;
                    sumB += pixel[2] * k;
                    weight += k;
                }
            }
            resultado[y][x] = new Uint8ClampedArray([
                Math.round(sumR / weight),
                Math.round(sumG / weight),
                Math.round(sumB / weight),
                matriz[y][x][3]
            ]);
        }
    }
    return resultado;
}

function suavizacaoConservativa(matriz) {
    if (!matriz) return null;

    const altura = matriz.length;
    const largura = matriz[0].length;
    const resultado = [];

    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            resultado[y][x] = new Uint8ClampedArray(matriz[y][x]);
        }
    }

    for (let y = 1; y < altura - 1; y++) {
        for (let x = 1; x < largura - 1; x++) {
            for (let canal = 0; canal < 3; canal++) {
                let minimo = 255, maximo = 0;
                for (let j = -1; j <= 1; j++) {
                    for (let i = -1; i <= 1; i++) {
                        if (i === 0 && j === 0) continue;
                        const valor = matriz[y + j][x + i][canal];
                        if (valor < minimo) minimo = valor;
                        if (valor > maximo) maximo = valor;
                    }
                }
                const pixel = matriz[y][x][canal];
                if (pixel < minimo) resultado[y][x][canal] = minimo;
                else if (pixel > maximo) resultado[y][x][canal] = maximo;
            }
            resultado[y][x][3] = matriz[y][x][3];
        }
    }

    return resultado;
}
