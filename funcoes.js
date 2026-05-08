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