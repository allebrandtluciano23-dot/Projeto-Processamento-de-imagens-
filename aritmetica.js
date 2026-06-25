function somarImagens(matriz1, matriz2) {
    if (!matriz1 || !matriz2 || matriz1.length !== matriz2.length || matriz1[0].length !== matriz2[0].length)
        return null;

    const altura = matriz1.length;
    const largura = matriz1[0].length;
    const resultado = [];

    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            resultado[y][x] = new Uint8ClampedArray([
                matriz1[y][x][0] + matriz2[y][x][0],
                matriz1[y][x][1] + matriz2[y][x][1],
                matriz1[y][x][2] + matriz2[y][x][2],
                Math.max(matriz1[y][x][3], matriz2[y][x][3])
            ]);
        }
    }

    return resultado;
}

function aumentarBrilho(matriz, valor) {
    if (!matriz) return null;

    const altura = matriz.length;
    const largura = matriz[0].length;
    const resultado = [];

    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            resultado[y][x] = new Uint8ClampedArray([
                matriz[y][x][0] + valor,
                matriz[y][x][1] + valor,
                matriz[y][x][2] + valor,
                matriz[y][x][3]
            ]);
        }
    }

    return resultado;
}

function subtrairImagens(matriz1, matriz2) {
    if (!matriz1 || !matriz2 || matriz1.length !== matriz2.length || matriz1[0].length !== matriz2[0].length)
        return null;

    const altura = matriz1.length;
    const largura = matriz1[0].length;
    const resultado = [];

    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            resultado[y][x] = new Uint8ClampedArray([
                matriz1[y][x][0] - matriz2[y][x][0],
                matriz1[y][x][1] - matriz2[y][x][1],
                matriz1[y][x][2] - matriz2[y][x][2],
                Math.max(matriz1[y][x][3], matriz2[y][x][3])
            ]);
        }
    }

    return resultado;
}

function diminuirBrilho(matriz, valor) {
    if (!matriz) return null;

    const altura = matriz.length;
    const largura = matriz[0].length;
    const resultado = [];

    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            resultado[y][x] = new Uint8ClampedArray([
                matriz[y][x][0] - valor,
                matriz[y][x][1] - valor,
                matriz[y][x][2] - valor,
                matriz[y][x][3]
            ]);
        }
    }

    return resultado;
}

function ajustarContraste(matriz, fator) {
    if (!matriz) return null;

    const altura = matriz.length;
    const largura = matriz[0].length;
    const resultado = [];

    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            resultado[y][x] = new Uint8ClampedArray([
                Math.round(matriz[y][x][0] * fator),
                Math.round(matriz[y][x][1] * fator),
                Math.round(matriz[y][x][2] * fator),
                matriz[y][x][3]
            ]);
        }
    }

    return resultado;
}

function dividirContraste(matriz, divisor) {
    if (!matriz || divisor === 0) return null;

    const altura = matriz.length;
    const largura = matriz[0].length;
    const resultado = [];

    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            resultado[y][x] = new Uint8ClampedArray([
                Math.round(matriz[y][x][0] / divisor),
                Math.round(matriz[y][x][1] / divisor),
                Math.round(matriz[y][x][2] / divisor),
                matriz[y][x][3]
            ]);
        }
    }

    return resultado;
}
