function updateGrid(grid, x, y, dir ) {
    const nextGrid = grid.map(rows => [...rows]);
    let nx = x, ny = y, ndir = dir;

    if (grid[x][y] === 0) {
        nextGrid[x][y] = 1;
        ndir = (dir + 1) % 4; // turn right
    } else {
        nextGrid[x][y] = 0;
        ndir = (dir + 3) % 4; // turn left
    }

    if (ndir === 0) nx -= 1;      // up
    else if (ndir === 1) ny += 1; // right
    else if (ndir === 2) nx += 1; // down
    else if (ndir === 3) ny -= 1; // left

    return { newGrid: nextGrid, nx, ny, ndir };
}

export default updateGrid;
