// Função para somar duas imagens pixel a pixel
function somarImagens(matriz1, matriz2) {
    if (!matriz1 || !matriz2 || matriz1.length !== matriz2.length || matriz1[0].length !== matriz2[0].length) {
        alert('As imagens devem ter o mesmo tamanho para somar.');
        return null;
    }

    const altura = matriz1.length;
    const largura = matriz1[0].length;
    const resultado = [];

    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            const r = Math.min(255, matriz1[y][x][0] + matriz2[y][x][0]);
            const g = Math.min(255, matriz1[y][x][1] + matriz2[y][x][1]);
            const b = Math.min(255, matriz1[y][x][2] + matriz2[y][x][2]);
            const a = Math.max(matriz1[y][x][3], matriz2[y][x][3]); // Mantém o alpha maior
            resultado[y][x] = [r, g, b, a];
        }
    }

    return resultado;
}

// Função para aumentar o brilho somando um valor constante a cada pixel
function aumentarBrilho(matriz, valor) {
    if (!matriz) return null;

    const altura = matriz.length;
    const largura = matriz[0].length;
    const resultado = [];

    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            const r = Math.min(255, matriz[y][x][0] + valor);
            const g = Math.min(255, matriz[y][x][1] + valor);
            const b = Math.min(255, matriz[y][x][2] + valor);
            const a = matriz[y][x][3]; // Mantém alpha inalterado
            resultado[y][x] = [r, g, b, a];
        }
    }

    return resultado;
}

// Função para subtrair duas imagens pixel a pixel (matriz1 - matriz2)
function subtrairImagens(matriz1, matriz2) {
    if (!matriz1 || !matriz2 || matriz1.length !== matriz2.length || matriz1[0].length !== matriz2[0].length) {
        alert('As imagens devem ter o mesmo tamanho para subtrair.');
        return null;
    }

    const altura = matriz1.length;
    const largura = matriz1[0].length;
    const resultado = [];

    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            const r = Math.max(0, matriz1[y][x][0] - matriz2[y][x][0]);
            const g = Math.max(0, matriz1[y][x][1] - matriz2[y][x][1]);
            const b = Math.max(0, matriz1[y][x][2] - matriz2[y][x][2]);
            const a = Math.max(matriz1[y][x][3], matriz2[y][x][3]); // Mantém o alpha maior
            resultado[y][x] = [r, g, b, a];
        }
    }

    return resultado;
}

// Função para diminuir o brilho subtraindo um valor constante de cada pixel
function diminuirBrilho(matriz, valor) {
    if (!matriz) return null;

    const altura = matriz.length;
    const largura = matriz[0].length;
    const resultado = [];

    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            const r = Math.max(0, matriz[y][x][0] - valor);
            const g = Math.max(0, matriz[y][x][1] - valor);
            const b = Math.max(0, matriz[y][x][2] - valor);
            const a = matriz[y][x][3]; // Mantém alpha inalterado
            resultado[y][x] = [r, g, b, a];
        }
    }

    return resultado;
}

// Função para ajustar o contraste multiplicando um valor constante a cada pixel
function ajustarContraste(matriz, fator) {
    if (!matriz) return null;

    const altura = matriz.length;
    const largura = matriz[0].length;
    const resultado = [];

    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            const r = Math.max(0, Math.min(255, Math.round(matriz[y][x][0] * fator)));
            const g = Math.max(0, Math.min(255, Math.round(matriz[y][x][1] * fator)));
            const b = Math.max(0, Math.min(255, Math.round(matriz[y][x][2] * fator)));
            const a = matriz[y][x][3]; // Mantém alpha inalterado
            resultado[y][x] = [r, g, b, a];
        }
    }

    return resultado;
}

// Função para dividir um valor constante em cada pixel (ajustar contraste)
function dividirContraste(matriz, divisor) {
    if (!matriz || divisor === 0) return null;

    const altura = matriz.length;
    const largura = matriz[0].length;
    const resultado = [];

    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            const r = Math.max(0, Math.min(255, Math.round(matriz[y][x][0] / divisor)));
            const g = Math.max(0, Math.min(255, Math.round(matriz[y][x][1] / divisor)));
            const b = Math.max(0, Math.min(255, Math.round(matriz[y][x][2] / divisor)));
            const a = matriz[y][x][3]; // Mantém alpha inalterado
            resultado[y][x] = [r, g, b, a];
        }
    }

    return resultado;
}

// Função para converter uma imagem RGB em escala de cinza
function converterParaCinza(matriz) {
    if (!matriz) return null;

    const altura = matriz.length;
    const largura = matriz[0].length;
    const resultado = [];

    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            const r = matriz[y][x][0];
            const g = matriz[y][x][1];
            const b = matriz[y][x][2];
            const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
            const a = matriz[y][x][3];
            resultado[y][x] = [gray, gray, gray, a];
        }
    }

    return resultado;
}

// Função para limiarizar uma imagem em binária
function limiarizar(matriz, limiar) {
    if (!matriz) return null;

    const altura = matriz.length;
    const largura = matriz[0].length;
    const resultado = [];

    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            const r = matriz[y][x][0];
            const g = matriz[y][x][1];
            const b = matriz[y][x][2];
            const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
            const binary = gray >= limiar ? 255 : 0;
            resultado[y][x] = [binary, binary, binary, matriz[y][x][3]];
        }
    }

    return resultado;
}

function logicaBinaria(matriz1, matriz2, limiar, operacao) {
    if (!matriz1) return null;
    if (operacao !== 'NOT' && !matriz2) return null;
    if (operacao !== 'NOT' && (matriz1.length !== matriz2.length || matriz1[0].length !== matriz2[0].length)) {
        alert('As imagens devem ter o mesmo tamanho para operações lógicas.');
        return null;
    }

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
                case 'AND':
                    value = v1 && v2 ? 255 : 0;
                    break;
                case 'OR':
                    value = v1 || v2 ? 255 : 0;
                    break;
                case 'XOR':
                    value = (v1 ^ v2) ? 255 : 0;
                    break;
                case 'NOT':
                    value = v1 ? 0 : 255;
                    break;
            }

            resultado[y][x] = [value, value, value, matriz1[y][x][3]];
        }
    }

    return resultado;
}

// Função para aplicar negativo a uma imagem
function negativo(matriz) {
    if (!matriz) return null;

    const altura = matriz.length;
    const largura = matriz[0].length;
    const resultado = [];

    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            const r = 255 - matriz[y][x][0];
            const g = 255 - matriz[y][x][1];
            const b = 255 - matriz[y][x][2];
            const a = matriz[y][x][3];
            resultado[y][x] = [r, g, b, a];
        }
    }

    return resultado;
}

// Função para equalizar o histograma de uma imagem em escala de cinza
function equalizacaoHistograma(matriz) {
    if (!matriz) return null;

    const altura = matriz.length;
    const largura = matriz[0].length;
    const total = altura * largura;
    const hist = new Array(256).fill(0);
    const resultado = [];

    for (let y = 0; y < altura; y++) {
        for (let x = 0; x < largura; x++) {
            const r = matriz[y][x][0];
            const g = matriz[y][x][1];
            const b = matriz[y][x][2];
            const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
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
            const r = matriz[y][x][0];
            const g = matriz[y][x][1];
            const b = matriz[y][x][2];
            const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
            const equalizado = cdf[gray];
            resultado[y][x] = [equalizado, equalizado, equalizado, matriz[y][x][3]];
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

function getNeighborhood(matriz, y, x, canal) {
    const valores = [];
    const altura = matriz.length;
    const largura = matriz[0].length;
    for (let j = -1; j <= 1; j++) {
        for (let i = -1; i <= 1; i++) {
            const yy = clamp(y + j, 0, altura - 1);
            const xx = clamp(x + i, 0, largura - 1);
            valores.push(matriz[yy][xx][canal]);
        }
    }
    return valores;
}

function maxFilter(matriz) {
    if (!matriz) return null;
    const altura = matriz.length;
    const largura = matriz[0].length;
    const resultado = [];
    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            const r = Math.max(...getNeighborhood(matriz, y, x, 0));
            const g = Math.max(...getNeighborhood(matriz, y, x, 1));
            const b = Math.max(...getNeighborhood(matriz, y, x, 2));
            resultado[y][x] = [r, g, b, matriz[y][x][3]];
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
            const r = Math.min(...getNeighborhood(matriz, y, x, 0));
            const g = Math.min(...getNeighborhood(matriz, y, x, 1));
            const b = Math.min(...getNeighborhood(matriz, y, x, 2));
            resultado[y][x] = [r, g, b, matriz[y][x][3]];
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
            const r = getNeighborhood(matriz, y, x, 0).reduce((a, b) => a + b, 0) / 9;
            const g = getNeighborhood(matriz, y, x, 1).reduce((a, b) => a + b, 0) / 9;
            const b = getNeighborhood(matriz, y, x, 2).reduce((a, b) => a + b, 0) / 9;
            resultado[y][x] = [Math.round(r), Math.round(g), Math.round(b), matriz[y][x][3]];
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
            const r = getNeighborhood(matriz, y, x, 0).sort((a, b) => a - b)[4];
            const g = getNeighborhood(matriz, y, x, 1).sort((a, b) => a - b)[4];
            const b = getNeighborhood(matriz, y, x, 2).sort((a, b) => a - b)[4];
            resultado[y][x] = [r, g, b, matriz[y][x][3]];
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
            const r = getNeighborhood(matriz, y, x, 0).sort((a, b) => a - b)[index];
            const g = getNeighborhood(matriz, y, x, 1).sort((a, b) => a - b)[index];
            const b = getNeighborhood(matriz, y, x, 2).sort((a, b) => a - b)[index];
            resultado[y][x] = [r, g, b, matriz[y][x][3]];
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
            let sumR = 0;
            let sumG = 0;
            let sumB = 0;
            let weight = 0;
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
            resultado[y][x] = [
                Math.round(sumR / weight),
                Math.round(sumG / weight),
                Math.round(sumB / weight),
                matriz[y][x][3]
            ];
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
                    const peso = kernel[j + 1][i + 1];
                    soma += grayValue(matriz[yy][xx]) * peso;
                }
            }
            soma = clamp(Math.abs(soma), 0, 255);
            resultado[y][x] = [soma, soma, soma, matriz[y][x][3]];
        }
    }
    return resultado;
}

function prewittFilter(matriz) {
    const kernelX = [
        [-1, 0, 1],
        [-1, 0, 1],
        [-1, 0, 1]
    ];
    const kernelY = [
        [1, 1, 1],
        [0, 0, 0],
        [-1, -1, -1]
    ];
    return gradientFilter(matriz, kernelX, kernelY);
}

function sobelFilter(matriz) {
    const kernelX = [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1]
    ];
    const kernelY = [
        [1, 2, 1],
        [0, 0, 0],
        [-1, -2, -1]
    ];
    return gradientFilter(matriz, kernelX, kernelY);
}

function laplacianFilter(matriz) {
    const kernel = [
        [0, 1, 0],
        [1, -4, 1],
        [0, 1, 0]
    ];
    return convolveGray(matriz, kernel);
}

function gradientFilter(matriz, kernelX, kernelY) {
    const altura = matriz.length;
    const largura = matriz[0].length;
    const resultado = [];
    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            let gx = 0;
            let gy = 0;
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
            resultado[y][x] = [magnitude, magnitude, magnitude, matriz[y][x][3]];
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
            const valor = grayValue(matriz[y][x]) >= limiar ? 255 : 0;
            resultado[y][x] = [valor, valor, valor, 255];
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
            resultado[y][x] = [binaryNeighborhood(binario, y, x).some(v => v === 255) ? 255 : 0, 0, 0, 255];
            resultado[y][x][1] = resultado[y][x][0];
            resultado[y][x][2] = resultado[y][x][0];
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
            resultado[y][x] = [binaryNeighborhood(binario, y, x).every(v => v === 255) ? 255 : 0, 0, 0, 255];
            resultado[y][x][1] = resultado[y][x][0];
            resultado[y][x][2] = resultado[y][x][0];
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
            const valor = binario[y][x][0] === 255 && erodido[y][x][0] === 0 ? 255 : 0;
            resultado[y][x] = [valor, valor, valor, 255];
        }
    }
    return resultado;
}

// Função para inverter a imagem da esquerda para a direita
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

// Função para inverter a imagem de cima para baixo
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

// Função para calcular a diferença absoluta entre duas imagens
function diferencaImagens(matriz1, matriz2) {
    if (!matriz1 || !matriz2 || matriz1.length !== matriz2.length || matriz1[0].length !== matriz2[0].length) {
        alert('As imagens devem ter o mesmo tamanho para calcular a diferença.');
        return null;
    }

    const altura = matriz1.length;
    const largura = matriz1[0].length;
    const resultado = [];

    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            const r = Math.abs(matriz1[y][x][0] - matriz2[y][x][0]);
            const g = Math.abs(matriz1[y][x][1] - matriz2[y][x][1]);
            const b = Math.abs(matriz1[y][x][2] - matriz2[y][x][2]);
            const a = Math.max(matriz1[y][x][3], matriz2[y][x][3]);
            resultado[y][x] = [r, g, b, a];
        }
    }

    return resultado;
}

// Função para combinar linearmente duas imagens com pesos alpha e beta
function combinacaoLinear(matriz1, matriz2, alpha, beta) {
    if (!matriz1 || !matriz2 || matriz1.length !== matriz2.length || matriz1[0].length !== matriz2[0].length) {
        alert('As imagens devem ter o mesmo tamanho para combinação linear.');
        return null;
    }

    const altura = matriz1.length;
    const largura = matriz1[0].length;
    const resultado = [];

    for (let y = 0; y < altura; y++) {
        resultado[y] = [];
        for (let x = 0; x < largura; x++) {
            const r = Math.max(0, Math.min(255, Math.round(alpha * matriz1[y][x][0] + beta * matriz2[y][x][0])));
            const g = Math.max(0, Math.min(255, Math.round(alpha * matriz1[y][x][1] + beta * matriz2[y][x][1])));
            const b = Math.max(0, Math.min(255, Math.round(alpha * matriz1[y][x][2] + beta * matriz2[y][x][2])));
            const a = Math.max(matriz1[y][x][3], matriz2[y][x][3]);
            resultado[y][x] = [r, g, b, a];
        }
    }

    return resultado;
}

// Função para calcular a média de duas imagens
function mediaImagens(matriz1, matriz2) {
    return combinacaoLinear(matriz1, matriz2, 0.5, 0.5);
}


// Função de suavização conservativa
function suavizacaoConservativa(matriz) {
    if (!matriz) return null;

    const altura = matriz.length;
    const largura = matriz[0].length;

    const resultado = [];

    for (let y = 0; y < altura; y++) {
        resultado[y] = [];

        for (let x = 0; x < largura; x++) {
            resultado[y][x] = [...matriz[y][x]];
        }
    }

    for (let y = 1; y < altura - 1; y++) {
        for (let x = 1; x < largura - 1; x++) {
            for (let canal = 0; canal < 3; canal++) {
                let minimo = 255;
                let maximo = 0;
                for (let j = -1; j <= 1; j++) {
                    for (let i = -1; i <= 1; i++) {
                        if (i === 0 && j === 0)
                            continue;
                        const valor = matriz[y + j][x + i][canal];
                        if (valor < minimo) minimo = valor;
                        if (valor > maximo) maximo = valor;
                    }
                }
                const pixel = matriz[y][x][canal];

                if (pixel < minimo) {
                    resultado[y][x][canal] = minimo;
                }
                else if (pixel > maximo) {
                    resultado[y][x][canal] = maximo;
                }
                else {
                    resultado[y][x][canal] = pixel;
                }
            }

            resultado[y][x][3] = matriz[y][x][3];
        }
    }

    return resultado;
}


// Função para salvar um canvas como arquivo PNG
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

// Função para desenhar uma matriz de pixels em um canvas
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
            imageData.data[index] = matriz[y][x][0];     // R
            imageData.data[index + 1] = matriz[y][x][1]; // G
            imageData.data[index + 2] = matriz[y][x][2]; // B
            imageData.data[index + 3] = matriz[y][x][3]; // A
        }
    }

    ctx.putImageData(imageData, 0, 0);
}