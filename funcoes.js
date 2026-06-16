/*
    funcoes.js
    Projeto-Processamento-de-imagens

    Este arquivo contém implementações de operações de processamento de
    imagens organizadas por seções:

    1) Operações Aritméticas (soma, subtração, brilho, contraste)
    2) Transformações (cinza, negativo, flip, diferença, blending)
    3) Equalização de histograma
    4) Filtros espaciais - Passa-baixa (max, min, mean, median, gaussian, order)
    5) Filtros passa-alta (Prewitt, Sobel, Laplaciano)
    6) Operações morfológicas (dilatação, erosão, abertura, fechamento, contorno)
    7) Utilitários (clamp, grayValue, neighborhood helpers)

    Cada seção está claramente marcada no arquivo. As funções recebem e
    retornam matrizes no formato [altura][largura][4] (R,G,B,A) onde cada
    pixel é um Uint8ClampedArray(4).
*/

// -----------------------
// Seção: Operações Aritméticas
// -----------------------

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

// ***********************
// FILTROS ESPACIAIS - PASSA-BAIXA
// ***********************

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

// Retorna [rArr, gArr, bArr] dos 9 vizinhos em uma única passagem
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

function grayValue(pixel) {
    return Math.round(0.299 * pixel[0] + 0.587 * pixel[1] + 0.114 * pixel[2]);
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

function prewittFilter(matriz) {
    const kernelX = [[-1, 0, 1], [-1, 0, 1], [-1, 0, 1]];
    const kernelY = [[1, 1, 1], [0, 0, 0], [-1, -1, -1]];
    return gradientFilter(matriz, kernelX, kernelY);
}

function sobelFilter(matriz) {
    const kernelX = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
    const kernelY = [[1, 2, 1], [0, 0, 0], [-1, -2, -1]];
    return gradientFilter(matriz, kernelX, kernelY);
}

function laplacianFilter(matriz) {
    const kernel = [[0, 1, 0], [1, -4, 1], [0, 1, 0]];
    return convolveGray(matriz, kernel);
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

// ***********************
// OPERAÇÕES MORFOLÓGICAS BINÁRIAS
// ***********************

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
