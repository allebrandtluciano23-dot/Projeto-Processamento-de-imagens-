function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function grayValue(pixel) {
    return Math.round(0.299 * pixel[0] + 0.587 * pixel[1] + 0.114 * pixel[2]);
}

function getNeighborhoodChannels(matriz, y, x) {
    const r = [], g = [], b = [];
    const altura = matriz.length;
    const largura = matriz[0].length;
    for (let j = -1; j <= 1; j++) {
        for (let i = -1; i <= 1; i++) {
            const yy = clamp(y + j, 0, altura - 1);
            const xx = clamp(x + i, 0, largura - 1);
            const p = matriz[yy][xx];
            r.push(p[0]);
            g.push(p[1]);
            b.push(p[2]);
        }
    }
    return [r, g, b];
}

function convolveGray(matriz, kernel) {
    const altura = matriz.length;
    const largura = matriz[0].length;
    const resultado = [];
    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            let soma = 0;
            for (let j = -1; j <= 1; j++) {
                for (let i = -1; i <= 1; i++) {
                    const yy = clamp(y + j, 0, altura - 1);
                    const xx = clamp(x + i, 0, largura - 1);
                    soma += grayValue(matriz[yy][xx]) * kernel[j + 1][i + 1];
                }
            }
            const v = clamp(Math.abs(soma), 0, 255);
            resultado[y][x] = new Uint8ClampedArray([v, v, v, matriz[y][x][3]]);
        }
    }
    return resultado;
}

function gradientFilter(matriz, kernelX, kernelY) {
    const altura = matriz.length;
    const largura = matriz[0].length;
    const resultado = [];
    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            let gx = 0, gy = 0;
            for (let j = -1; j <= 1; j++) {
                for (let i = -1; i <= 1; i++) {
                    const yy = clamp(y + j, 0, altura - 1);
                    const xx = clamp(x + i, 0, largura - 1);
                    const valor = grayValue(matriz[yy][xx]);
                    gx += valor * kernelX[j + 1][i + 1];
                    gy += valor * kernelY[j + 1][i + 1];
                }
            }
            const magnitude = clamp(Math.round(Math.sqrt(gx * gx + gy * gy)), 0, 255);
            resultado[y][x] = new Uint8ClampedArray([magnitude, magnitude, magnitude, matriz[y][x][3]]);
        }
    }
    return resultado;
}

function binarizar(matriz, limiar) {
    const altura = matriz.length;
    const largura = matriz[0].length;
    const resultado = [];
    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            const v = grayValue(matriz[y][x]) >= limiar ? 255 : 0;
            resultado[y][x] = new Uint8ClampedArray([v, v, v, 255]);
        }
    }
    return resultado;
}

function binaryNeighborhood(matriz, y, x) {
    const altura = matriz.length;
    const largura = matriz[0].length;
    const valores = [];
    for (let j = -1; j <= 1; j++) {
        for (let i = -1; i <= 1; i++) {
            const yy = clamp(y + j, 0, altura - 1);
            const xx = clamp(x + i, 0, largura - 1);
            valores.push(matriz[yy][xx][0]);
        }
    }
    return valores;
}

function desenharMatrizNoCanvas(matriz, canvasId) {
    if (!matriz) return;

    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    const altura = matriz.length;
    const largura = matriz[0].length;

    canvas.width = largura;
    canvas.height = altura;

    const imageData = ctx.createImageData(largura, altura);
    for (let y = 0; y < altura; y++) {
        for (let x = 0; x < largura; x++) {
            const index = (y * largura + x) * 4;
            imageData.data[index]     = matriz[y][x][0];
            imageData.data[index + 1] = matriz[y][x][1];
            imageData.data[index + 2] = matriz[y][x][2];
            imageData.data[index + 3] = matriz[y][x][3];
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

function salvarCanvasComoImagem(canvasId, fileName) {
    const canvas = document.getElementById(canvasId);
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
