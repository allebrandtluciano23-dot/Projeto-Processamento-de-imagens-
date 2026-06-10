// Variáveis globais para armazenar as matrizes de pixels
let matrizImagem1 = null;
let matrizImagem2 = null;

document.getElementById('loadBtn').addEventListener('click', function() {
    const fileInput1 = document.getElementById('fileInput1');
    const fileInput2 = document.getElementById('fileInput2');
    const output = document.getElementById('output');

    if (fileInput1.files.length === 0 || fileInput2.files.length === 0) {
        output.innerHTML = 'Por favor, selecione duas imagens.';
        return;
    }

    const file1 = fileInput1.files[0];
    const file2 = fileInput2.files[0];

    // Carregar primeira imagem
    loadImage(file1, function(img1, width1, height1, pixels1, dataURL1) {
        matrizImagem1 = pixels1;
        document.getElementById('image1').src = dataURL1;
        console.log('Imagem 1 carregada:', width1, 'x', height1);

        // Carregar segunda imagem
        loadImage(file2, function(img2, width2, height2, pixels2, dataURL2) {
            matrizImagem2 = pixels2;
            document.getElementById('image2').src = dataURL2;
            console.log('Imagem 2 carregada:', width2, 'x', height2);

            output.innerHTML = `
                <p>Imagem 1: ${width1}x${height1} pixels</p>
                <p>Imagem 2: ${width2}x${height2} pixels</p>
                <p>Matrizes de pixels armazenadas em matrizImagem1 e matrizImagem2.</p>
            `;
        });
    });
});

function loadImage(file, callback) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const dataURL = e.target.result;
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, img.width, img.height);
            const pixels = [];
            for (let y = 0; y < img.height; y++) {
                pixels[y] = [];
                for (let x = 0; x < img.width; x++) {
                    const index = (y * img.width + x) * 4;
                    pixels[y][x] = [
                        imageData.data[index],     // R
                        imageData.data[index + 1], // G
                        imageData.data[index + 2], // B
                        imageData.data[index + 3]  // A
                    ];
                }
            }
            callback(img, img.width, img.height, pixels, dataURL);
        };
        img.src = dataURL;
    };
    reader.readAsDataURL(file);
}

// Event listeners para operações
document.getElementById('sumImagesBtn').addEventListener('click', function() {
    if (!matrizImagem1 || !matrizImagem2) {
        alert('Carregue as imagens primeiro.');
        return;
    }
    const resultado = somarImagens(matrizImagem1, matrizImagem2);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = 'Operação: Soma das imagens aplicada.';
    }
});

document.getElementById('subtractImagesBtn').addEventListener('click', function() {
    if (!matrizImagem1 || !matrizImagem2) {
        alert('Carregue as imagens primeiro.');
        return;
    }
    const resultado = subtrairImagens(matrizImagem1, matrizImagem2);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = 'Operação: Subtração das imagens aplicada (Imagem1 - Imagem2).';
    }
});

document.getElementById('brightenBtn').addEventListener('click', function() {
    if (!matrizImagem1) {
        alert('Carregue as imagens primeiro.');
        return;
    }
    const valor = parseInt(document.getElementById('brightnessValue').value);
    if (isNaN(valor) || valor < 0 || valor > 255) {
        alert('Digite um valor entre 0 e 255.');
        return;
    }
    const resultado = aumentarBrilho(matrizImagem1, valor);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = `Operação: Brilho aumentado em ${valor}.`;
    }
});

document.getElementById('darkenBtn').addEventListener('click', function() {
    if (!matrizImagem1) {
        alert('Carregue as imagens primeiro.');
        return;
    }
    const valor = parseInt(document.getElementById('darknessValue').value);
    if (isNaN(valor) || valor < 0 || valor > 255) {
        alert('Digite um valor entre 0 e 255.');
        return;
    }
    const resultado = diminuirBrilho(matrizImagem1, valor);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = `Operação: Brilho diminuído em ${valor}.`;
    }
});

document.getElementById('contrastBtn').addEventListener('click', function() {
    if (!matrizImagem1) {
        alert('Carregue as imagens primeiro.');
        return;
    }
    const fator = parseFloat(document.getElementById('contrastValue').value);
    if (isNaN(fator) || fator < 0.1 || fator > 5.0) {
        alert('Digite um fator entre 0.1 e 5.0.');
        return;
    }
    const resultado = ajustarContraste(matrizImagem1, fator);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = `Operação: Contraste multiplicado por ${fator}.`;
    }
});

document.getElementById('divideContrastBtn').addEventListener('click', function() {
    if (!matrizImagem1) {
        alert('Carregue as imagens primeiro.');
        return;
    }
    const divisor = parseFloat(document.getElementById('divideContrastValue').value);
    if (isNaN(divisor) || divisor < 0.1 || divisor > 5.0) {
        alert('Digite um divisor entre 0.1 e 5.0.');
        return;
    }
    const resultado = dividirContraste(matrizImagem1, divisor);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = `Operação: Contraste dividido por ${divisor}.`;
    }
});

document.getElementById('grayBtn').addEventListener('click', function() {
    if (!matrizImagem1) {
        alert('Carregue a imagem primeiro.');
        return;
    }
    const resultado = converterParaCinza(matrizImagem1);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = 'Operação: Conversão para escala de cinza aplicada.';
    }
});

document.getElementById('thresholdBtn').addEventListener('click', function() {
    if (!matrizImagem1) {
        alert('Carregue a imagem primeiro.');
        return;
    }
    const limiar = parseInt(document.getElementById('thresholdValue').value);
    if (isNaN(limiar) || limiar < 0 || limiar > 255) {
        alert('Digite um limiar entre 0 e 255.');
        return;
    }
    const resultado = limiarizar(matrizImagem1, limiar);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = `Operação: Limiarização aplicada com limiar ${limiar}.`;
    }
});

document.getElementById('andBtn').addEventListener('click', function() {
    if (!matrizImagem1 || !matrizImagem2) {
        alert('Carregue as duas imagens primeiro.');
        return;
    }
    const limiar = parseInt(document.getElementById('thresholdValue').value);
    if (isNaN(limiar) || limiar < 0 || limiar > 255) {
        alert('Digite um limiar entre 0 e 255.');
        return;
    }
    const resultado = logicaBinaria(matrizImagem1, matrizImagem2, limiar, 'AND');
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = 'Operação: AND binário aplicada.';
    }
});

document.getElementById('orBtn').addEventListener('click', function() {
    if (!matrizImagem1 || !matrizImagem2) {
        alert('Carregue as duas imagens primeiro.');
        return;
    }
    const limiar = parseInt(document.getElementById('thresholdValue').value);
    if (isNaN(limiar) || limiar < 0 || limiar > 255) {
        alert('Digite um limiar entre 0 e 255.');
        return;
    }
    const resultado = logicaBinaria(matrizImagem1, matrizImagem2, limiar, 'OR');
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = 'Operação: OR binário aplicada.';
    }
});

document.getElementById('xorBtn').addEventListener('click', function() {
    if (!matrizImagem1 || !matrizImagem2) {
        alert('Carregue as duas imagens primeiro.');
        return;
    }
    const limiar = parseInt(document.getElementById('thresholdValue').value);
    if (isNaN(limiar) || limiar < 0 || limiar > 255) {
        alert('Digite um limiar entre 0 e 255.');
        return;
    }
    const resultado = logicaBinaria(matrizImagem1, matrizImagem2, limiar, 'XOR');
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = 'Operação: XOR binário aplicada.';
    }
});

document.getElementById('notBtn').addEventListener('click', function() {
    if (!matrizImagem1) {
        alert('Carregue a imagem primeiro.');
        return;
    }
    const limiar = parseInt(document.getElementById('thresholdValue').value);
    if (isNaN(limiar) || limiar < 0 || limiar > 255) {
        alert('Digite um limiar entre 0 e 255.');
        return;
    }
    const resultado = logicaBinaria(matrizImagem1, null, limiar, 'NOT');
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = 'Operação: NOT binário aplicada.';
    }
});

document.getElementById('negativeBtn').addEventListener('click', function() {
    if (!matrizImagem1) {
        alert('Carregue a imagem primeiro.');
        return;
    }
    const resultado = negativo(matrizImagem1);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = 'Operação: Negativo aplicada.';
    }
});

document.getElementById('equalizeBtn').addEventListener('click', function() {
    if (!matrizImagem1) {
        alert('Carregue a imagem primeiro.');
        return;
    }
    const resultado = equalizacaoHistograma(matrizImagem1);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = 'Operação: Equalização de histograma aplicada.';
    }
});

document.getElementById('maxFilterBtn').addEventListener('click', function() {
    if (!matrizImagem1) {
        alert('Carregue a imagem primeiro.');
        return;
    }
    const resultado = maxFilter(matrizImagem1);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = 'Operação: Filtro MAX aplicada.';
    }
});

document.getElementById('minFilterBtn').addEventListener('click', function() {
    if (!matrizImagem1) {
        alert('Carregue a imagem primeiro.');
        return;
    }
    const resultado = minFilter(matrizImagem1);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = 'Operação: Filtro MIN aplicada.';
    }
});

document.getElementById('meanFilterBtn').addEventListener('click', function() {
    if (!matrizImagem1) {
        alert('Carregue a imagem primeiro.');
        return;
    }
    const resultado = meanFilter(matrizImagem1);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = 'Operação: Filtro MEAN aplicada.';
    }
});

document.getElementById('medianFilterBtn').addEventListener('click', function() {
    if (!matrizImagem1) {
        alert('Carregue a imagem primeiro.');
        return;
    }
    const resultado = medianFilter(matrizImagem1);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = 'Operação: Filtro MEDIANA aplicada.';
    }
});

document.getElementById('orderFilterBtn').addEventListener('click', function() {
    if (!matrizImagem1) {
        alert('Carregue a imagem primeiro.');
        return;
    }
    const posicao = parseInt(document.getElementById('orderPositionValue').value);
    if (isNaN(posicao) || posicao < 1 || posicao > 9) {
        alert('Digite uma posição de 1 a 9.');
        return;
    }
    const resultado = orderFilter(matrizImagem1, posicao);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = `Operação: Filtro ORDEM aplicada (posição ${posicao}).`;
    }
});

document.getElementById('gaussianFilterBtn').addEventListener('click', function() {
    if (!matrizImagem1) {
        alert('Carregue a imagem primeiro.');
        return;
    }
    const resultado = gaussianFilter(matrizImagem1);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = 'Operação: Filtro GAUSSIANO aplicada.';
    }
});

document.getElementById('prewittBtn').addEventListener('click', function() {
    if (!matrizImagem1) {
        alert('Carregue a imagem primeiro.');
        return;
    }
    const resultado = prewittFilter(matrizImagem1);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = 'Operação: Detecção de borda Prewitt aplicada.';
    }
});

document.getElementById('sobelBtn').addEventListener('click', function() {
    if (!matrizImagem1) {
        alert('Carregue a imagem primeiro.');
        return;
    }
    const resultado = sobelFilter(matrizImagem1);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = 'Operação: Detecção de borda Sobel aplicada.';
    }
});

document.getElementById('laplacianBtn').addEventListener('click', function() {
    if (!matrizImagem1) {
        alert('Carregue a imagem primeiro.');
        return;
    }
    const resultado = laplacianFilter(matrizImagem1);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = 'Operação: Detecção de borda Laplaciano aplicada.';
    }
});

document.getElementById('dilateBtn').addEventListener('click', function() {
    if (!matrizImagem1) {
        alert('Carregue a imagem primeiro.');
        return;
    }
    const limiar = parseInt(document.getElementById('thresholdValue').value);
    if (isNaN(limiar) || limiar < 0 || limiar > 255) {
        alert('Digite um limiar entre 0 e 255.');
        return;
    }
    const resultado = dilatacao(matrizImagem1, limiar);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = 'Operação: Dilatação aplicada.';
    }
});

document.getElementById('erodeBtn').addEventListener('click', function() {
    if (!matrizImagem1) {
        alert('Carregue a imagem primeiro.');
        return;
    }
    const limiar = parseInt(document.getElementById('thresholdValue').value);
    if (isNaN(limiar) || limiar < 0 || limiar > 255) {
        alert('Digite um limiar entre 0 e 255.');
        return;
    }
    const resultado = erosao(matrizImagem1, limiar);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = 'Operação: Erosão aplicada.';
    }
});

document.getElementById('openBtn').addEventListener('click', function() {
    if (!matrizImagem1) {
        alert('Carregue a imagem primeiro.');
        return;
    }
    const limiar = parseInt(document.getElementById('thresholdValue').value);
    if (isNaN(limiar) || limiar < 0 || limiar > 255) {
        alert('Digite um limiar entre 0 e 255.');
        return;
    }
    const resultado = abertura(matrizImagem1, limiar);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = 'Operação: Abertura aplicada.';
    }
});

document.getElementById('closeBtn').addEventListener('click', function() {
    if (!matrizImagem1) {
        alert('Carregue a imagem primeiro.');
        return;
    }
    const limiar = parseInt(document.getElementById('thresholdValue').value);
    if (isNaN(limiar) || limiar < 0 || limiar > 255) {
        alert('Digite um limiar entre 0 e 255.');
        return;
    }
    const resultado = fechamento(matrizImagem1, limiar);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = 'Operação: Fechamento aplicada.';
    }
});

document.getElementById('contourBtn').addEventListener('click', function() {
    if (!matrizImagem1) {
        alert('Carregue a imagem primeiro.');
        return;
    }
    const limiar = parseInt(document.getElementById('thresholdValue').value);
    if (isNaN(limiar) || limiar < 0 || limiar > 255) {
        alert('Digite um limiar entre 0 e 255.');
        return;
    }
    const resultado = contorno(matrizImagem1, limiar);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = 'Operação: Contorno aplicada.';
    }
});

document.getElementById('differenceBtn').addEventListener('click', function() {
    if (!matrizImagem1 || !matrizImagem2) {
        alert('Carregue as duas imagens primeiro.');
        return;
    }
    const resultado = diferencaImagens(matrizImagem1, matrizImagem2);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = 'Operação: Diferença de imagens aplicada.';
    }
});

document.getElementById('blendBtn').addEventListener('click', function() {
    if (!matrizImagem1 || !matrizImagem2) {
        alert('Carregue as duas imagens primeiro.');
        return;
    }
    const alpha = parseFloat(document.getElementById('blendAlphaValue').value);
    const beta = parseFloat(document.getElementById('blendBetaValue').value);
    if (isNaN(alpha) || alpha < 0 || alpha > 1 || isNaN(beta) || beta < 0 || beta > 1) {
        alert('Digite valores de alpha e beta entre 0 e 1.');
        return;
    }
    const resultado = combinacaoLinear(matrizImagem1, matrizImagem2, alpha, beta);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = `Operação: Combinação linear aplicada (alpha=${alpha}, beta=${beta}).`;
    }
});

document.getElementById('averageBtn').addEventListener('click', function() {
    if (!matrizImagem1 || !matrizImagem2) {
        alert('Carregue as duas imagens primeiro.');
        return;
    }
    const resultado = mediaImagens(matrizImagem1, matrizImagem2);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = 'Operação: Média de imagens aplicada.';
    }
});

document.getElementById('flipHorizontalBtn').addEventListener('click', function() {
    if (!matrizImagem1) {
        alert('Carregue a imagem primeiro.');
        return;
    }
    const resultado = inverterHorizontal(matrizImagem1);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = 'Operação: Inversão horizontal aplicada.';
    }
});

document.getElementById('flipVerticalBtn').addEventListener('click', function() {
    if (!matrizImagem1) {
        alert('Carregue a imagem primeiro.');
        return;
    }
    const resultado = inverterVertical(matrizImagem1);
    if (resultado) {
        desenharMatrizNoCanvas(resultado, 'resultCanvas');
        document.getElementById('output').innerHTML = 'Operação: Inversão vertical aplicada.';
    }
});

// Suavização Conservativa
document.getElementById('smoothBtn').addEventListener('click', function () {

    if (!matrizImagem1) {
        alert('Carregue a imagem primeiro.');
        return;
    }

    const resultado = suavizacaoConservativa(matrizImagem1);

    if (resultado) {

        desenharMatrizNoCanvas(resultado, 'resultCanvas');

        document.getElementById('output').innerHTML =
            'Operação: Suavização conservativa aplicada.';
    }
});

document.getElementById('saveResultBtn').addEventListener('click', function() {
    const canvas = document.getElementById('resultCanvas');
    if (!canvas || canvas.width === 0 || canvas.height === 0) {
        alert('Nada para salvar. Faça uma operação primeiro.');
        return;
    }
    salvarCanvasComoImagem('resultCanvas', 'resultado.png');
});