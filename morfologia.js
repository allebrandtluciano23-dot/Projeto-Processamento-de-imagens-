function dilatacao(matriz, limiar) {
    const binario = binarizar(matriz, limiar);
    const altura = binario.length;
    const largura = binario[0].length;
    const resultado = [];
    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            const v = binaryNeighborhood(binario, y, x).some(v => v === 255) ? 255 : 0;
            resultado[y][x] = new Uint8ClampedArray([v, v, v, 255]);
        }
    }
    return resultado;
}

function erosao(matriz, limiar) {
    const binario = binarizar(matriz, limiar);
    const altura = binario.length;
    const largura = binario[0].length;
    const resultado = [];
    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            const v = binaryNeighborhood(binario, y, x).every(v => v === 255) ? 255 : 0;
            resultado[y][x] = new Uint8ClampedArray([v, v, v, 255]);
        }
    }
    return resultado;
}

function abertura(matriz, limiar) {
    return dilatacao(erosao(matriz, limiar), limiar);
}

function fechamento(matriz, limiar) {
    return erosao(dilatacao(matriz, limiar), limiar);
}

function contorno(matriz, limiar) {
    const binario = binarizar(matriz, limiar);
    const erodido = erosao(matriz, limiar);
    const altura = binario.length;
    const largura = binario[0].length;
    const resultado = [];
    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            const v = binario[y][x][0] === 255 && erodido[y][x][0] === 0 ? 255 : 0;
            resultado[y][x] = new Uint8ClampedArray([v, v, v, 255]);
        }
    }
    return resultado;
}
