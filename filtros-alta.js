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
