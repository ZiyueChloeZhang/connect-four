import { describe, expect, test } from '@jest/globals';
import { horizontallyConnectedPositions, makeAMove, getlastEmptyRowIndex, Cell, isColumnFull, isColumnValid, Board, verticallyConnectedPositions, getRow, hasConnectedFour, getDiagonalTopLeftToBottomRight, getDiagnalBottomLeftToTopRight, diagonalTopLeftToBottomRightConnectedPositions, diagonalBottomLeftToTopRightConnectedPositions } from './gameEngine';

describe('lastEmptyRowIndex', () => {
    test('empty column should return 5', () => {
        // arrange
        const emptyColumn = [null, null, null, null, null, null];
        // act & assert
        expect(getlastEmptyRowIndex(emptyColumn)).toBe(5);
    });

    test('full column should throw error', () => {
        // arrange
        const column: Cell[] = ['RED', 'RED', 'RED', 'YELLOW', 'YELLOW', 'YELLOW'];
        // act & assert
        expect(() => getlastEmptyRowIndex(column)).toThrowError();
    });

    test('should return correct index', () => {
        // arrange
        const emptyColumn: Cell[] = [null, null, 'RED', 'YELLOW', 'YELLOW', 'YELLOW'];
        // act & assert
        expect(getlastEmptyRowIndex(emptyColumn)).toBe(1);
    });
});

describe('isColumnFull', () => {
    test('column is full', () => {
        const column: Cell[] = ['RED', 'RED', 'RED', 'YELLOW', 'YELLOW', 'YELLOW'];
        expect(isColumnFull(column)).toBeTruthy();
    });

    test('column is not full', () => {
        const column: Cell[] = [null, 'RED', 'RED', 'YELLOW', 'YELLOW', 'YELLOW'];
        expect(isColumnFull(column)).toBeFalsy();
    });
});

describe('isColumnValid', () => {
    test('column is valid', () => {
        const column: Cell[] = ['RED', 'RED', 'RED', 'YELLOW', 'YELLOW', 'YELLOW'];
        expect(isColumnValid(column)).toBeTruthy();
    });

    test('column is not valid', () => {
        const column: Cell[] = [null, 'RED', 'RED', null, 'YELLOW', 'YELLOW'];
        expect(isColumnValid(column)).toBeFalsy();
    });

    test('column has no disc, should return true', () => {
        const column: Cell[] = [null, null, null, null, null, null];
        expect(isColumnValid(column)).toBeTruthy();
    });
});

describe('checkVertically', () => {
    test('winning', async () => {
        const board: Board = [
            //  0   1      2      3     4      5  
            [null, null, 'RED', 'RED', 'RED', 'RED'], // 0
            [null, null, null, null, null, null], // 1
            [null, null, null, null, null, null], // 2
            [null, null, null, null, null, null], // 3
            [null, null, null, null, null, null], // 4
            [null, null, null, null, null, null], // 5
            [null, null, null, null, null, null], // 6
        ]
        await expect(verticallyConnectedPositions(board, [0, 2])).resolves.toStrictEqual([[0, 2], [0, 3], [0, 4], [0, 5]]);
    });

    test('discs color does not match, no winning', async () => {
        const board: Board = [
            //  0   1      2      3     4      5  
            [null, null, 'YELLOW', 'RED', 'RED', 'RED'], // 0
            [null, null, null, null, null, null], // 1
            [null, null, null, null, null, null], // 2
            [null, null, null, null, null, null], // 3
            [null, null, null, null, null, null], // 4
            [null, null, null, null, null, null], // 5
            [null, null, null, null, null, null], // 6
        ]

        await expect(verticallyConnectedPositions(board, [0, 2])).rejects.toThrow();
    });

    test('less than 4 discs, no winning', async () => {
        const board: Board = [
            //  0   1      2      3     4      5  
            [null, null, null, 'RED', 'RED', 'RED'], // 0
            [null, null, null, null, null, null], // 1
            [null, null, null, null, null, null], // 2
            [null, null, null, null, null, null], // 3
            [null, null, null, null, null, null], // 4
            [null, null, null, null, null, null], // 5
            [null, null, null, null, null, null], // 6
        ]

        await expect(verticallyConnectedPositions(board, [0, 3])).rejects.toThrow();
    });
})

describe('checkHorizontally', () => {
    test('winning', async () => {
        const board: Board = [
            //  0   1      2      3     4      5  
            ["RED", null, null, null, null, null], // 0
            ["RED", null, null, null, null, null], // 1
            ["RED", null, null, null, null, null], // 2
            ["RED", null, null, null, null, null], // 3
            [null, null, null, null, null, null], // 4
            [null, null, null, null, null, null], // 5
            [null, null, null, null, null, null], // 6
        ]
        await expect(horizontallyConnectedPositions(board, [0, 0])).resolves.toStrictEqual([[0, 0], [1, 0], [2, 0], [3, 0]]);
    });

    test('discs color does not match, no winning', async () => {
        const board: Board = [
            //  0   1      2      3     4      5  
            ["RED", null, null, null, null, null], // 0
            ["YELLOW", null, null, null, null, null], // 1
            ["RED", null, null, null, null, null], // 2
            ["RED", null, null, null, null, null], // 3
            [null, null, null, null, null, null], // 4
            [null, null, null, null, null, null], // 5
            [null, null, null, null, null, null], // 6
        ]

        await expect(horizontallyConnectedPositions(board, [0, 0])).rejects.toThrow();
    });

    test('less than 4 discs, no winning', async () => {
        const board: Board = [
            //  0   1      2      3     4      5  
            [null, null, null, 'RED', 'RED', 'RED'], // 0
            [null, null, null, null, null, null], // 1
            [null, null, null, null, null, null], // 2
            [null, null, null, null, null, null], // 3
            [null, null, null, null, null, null], // 4
            [null, null, null, null, null, null], // 5
            [null, null, null, null, null, null], // 6
        ]

        await expect(horizontallyConnectedPositions(board, [0, 0])).rejects.toThrow();
    });
})

describe('check diagnoly', () => {
    test('from top left to bottom right', async () => {
        const board: Board = [
            //  0   1      2      3     4      5  
            [null, null, null, null, null, null], // 0
            [null, "RED", null, null, null, null], // 1
            [null, null, "RED", null, null, null], // 2
            [null, null, null, "RED", null, null], // 3
            [null, null, null, null, "RED", null], // 4
            [null, null, null, null, null, null], // 5
            [null, null, null, null, null, null], // 6
        ]
        await expect(diagonalTopLeftToBottomRightConnectedPositions(board, [2, 2])).resolves.toStrictEqual([[1, 1], [2, 2], [3, 3], [4, 4]]);
    });

    test('from bottom left to top right', async () => {
        const board: Board = [
            //  0   1      2      3     4      5  
            [null, null, null, null, null, null], // 0
            [null, "RED", null, null, null, null], // 1
            [null, null, "RED", null, null, null], // 2
            [null, null, null, "YELLOW", null, null], // 3
            [null, null, "YELLOW", null, "RED", null], // 4
            [null, "YELLOW", null, null, null, null], // 5
            ["YELLOW", null, null, null, null, null], // 6
        ]
        await expect(diagonalBottomLeftToTopRightConnectedPositions(board, [5, 1])).resolves.toStrictEqual([[3, 3], [4, 2], [5, 1], [6, 0]]);
    });


})

describe('makeAMove', () => {
    test('should only update the board', async () => {
        const board: Board = [
            //  0   1      2      3     4      5  
            [null, null, null, 'RED', 'RED', 'RED'], // 0
            [null, null, null, null, null, null], // 1
            [null, null, null, null, null, null], // 2
            [null, null, null, null, null, null], // 3
            [null, null, null, null, null, null], // 4
            [null, null, null, null, null, null], // 5
            [null, null, null, null, null, null], // 6
        ]

        const expectedBoard = [
            //  0   1      2      3     4      5  
            [null, null, "YELLOW", 'RED', 'RED', 'RED'], // 0
            [null, null, null, null, null, null], // 1
            [null, null, null, null, null, null], // 2
            [null, null, null, null, null, null], // 3
            [null, null, null, null, null, null], // 4
            [null, null, null, null, null, null], // 5
            [null, null, null, null, null, null], // 6
        ]

        await expect(makeAMove('YELLOW', 0, board)).resolves.toStrictEqual({
            board: expectedBoard,
            connectedCellPositions: null,
            winner: null
        });

    })

    test('should update the board and winner', async () => {
        const board: Board = [
            //  0   1      2      3     4      5  
            [null, null, null, 'RED', 'RED', 'RED'], // 0
            [null, null, null, null, null, null], // 1
            [null, null, null, null, null, null], // 2
            [null, null, null, null, null, null], // 3
            [null, null, null, null, null, null], // 4
            [null, null, null, null, null, null], // 5
            [null, null, null, null, null, null], // 6
        ]

        const expectedBoard = [
            //  0   1      2      3     4      5  
            [null, null, "RED", 'RED', 'RED', 'RED'], // 0
            [null, null, null, null, null, null], // 1
            [null, null, null, null, null, null], // 2
            [null, null, null, null, null, null], // 3
            [null, null, null, null, null, null], // 4
            [null, null, null, null, null, null], // 5
            [null, null, null, null, null, null], // 6
        ]

        await expect(makeAMove('RED', 0, board)).resolves.toStrictEqual({
            board: expectedBoard,
            connectedCellPositions: [[0, 2], [0, 3], [0, 4], [0, 5]],
            winner: "RED"
        });

    })
})

describe('getRow', () => {
    test('should return row', () => {
        const board: Board = [
            //  0   1      2      3     4      5  
            [null, null, null, 'RED', 'RED', 'RED'], // 0
            [null, null, null, 'YELLOW', null, null], // 1
            [null, null, null, null, null, null], // 2
            [null, null, null, 'RED', null, null], // 3
            [null, null, null, null, null, null], // 4
            [null, null, null, 'YELLOW', null, null], // 5
            [null, null, null, null, null, null], // 6
        ]

        expect(getRow(board, 3)).toStrictEqual(["RED", "YELLOW", null, "RED", null, "YELLOW", null]);
    })
})

describe('getDiagnalTopLeftToBottomRight', () => {
    test('short, should return diagnal', () => {
        const board: Board = [
            //  0   1      2      3     4        5  
            [null, null, null, 'RED', 'RED', 'RED'], // 0
            [null, null, null, 'YELLOW', null, null], // 1
            [null, null, null, null, null, 'YELLOW'], // 2
            [null, null, null, 'RED', null, null], // 3
            [null, null, null, null, null, null], // 4
            [null, null, null, 'YELLOW', null, null], // 5
            [null, null, null, null, null, null], // 6
        ]

        expect(getDiagonalTopLeftToBottomRight(board, [1, 3])).toStrictEqual({
            collection: [null, "YELLOW", null, null],
            index: 1
        });
    })


    test('short, should return diagnal', () => {
        const board: Board = [
            //  0   1      2      3     4      5  
            [null, null, null, null, null, null], // 0
            [null, "RED", null, null, null, null], // 1
            [null, null, "RED", null, null, null], // 2
            [null, null, null, "RED", null, null], // 3
            [null, null, null, null, "RED", null], // 4
            [null, null, null, null, null, null], // 5
            [null, null, null, null, null, null], // 6

        ]

        expect(getDiagonalTopLeftToBottomRight(board, [2, 2])).toStrictEqual({
            collection: [null, "RED", "RED", "RED", "RED", null],
            index: 2
        });
    })
})

describe('getDiagnalBottomLeftToTopRight', () => {
    test('short, should return diagnal', () => {
        const board: Board = [
            //  0   1      2      3     4        5  
            [null, null, null, 'RED', 'RED', 'RED'], // 0
            [null, null, null, 'YELLOW', null, null], // 1
            [null, null, null, null, null, 'YELLOW'], // 2
            [null, null, null, 'RED', null, null], // 3
            [null, null, null, null, null, null], // 4
            [null, null, null, 'YELLOW', null, null], // 5
            [null, null, null, null, null, null], // 6
        ]

        expect(getDiagnalBottomLeftToTopRight(board, [1, 3])).toStrictEqual({
            collection: ["RED", "YELLOW", null, null, null],
            index: 1
        });
    })
})

describe('hasConnectedFour', () => {
    test('given index is at the first position of connected fours, should resolve', async () => {
        const collection: Cell[] = ['RED', 'RED', 'RED', 'RED', null, null, null];

        await expect(hasConnectedFour(collection, 0)).resolves.toStrictEqual([0, 1, 2, 3]);
    })

    test('given index is at the second position of connected fours, should resolve', async () => {
        const collection: Cell[] = ['RED', 'RED', 'RED', 'RED', null, null, null];

        await expect(hasConnectedFour(collection, 1)).resolves.toStrictEqual([0, 1, 2, 3]);
    })

    test('given index is at the third position of connected fours, should resolve', async () => {
        const collection: Cell[] = ['RED', 'RED', 'RED', 'RED', null, null, null];

        await expect(hasConnectedFour(collection, 2)).resolves.toStrictEqual([0, 1, 2, 3]);
    })

    test('given index is at the fourth position of connected fours, should resolve', async () => {
        const collection: Cell[] = ['RED', 'RED', 'RED', 'RED', null, null, null];

        await expect(hasConnectedFour(collection, 3)).resolves.toStrictEqual([0, 1, 2, 3]);
    })

    test('should resolve', async () => {
        const collection: Cell[] = [null, null, null, 'RED', 'RED', 'RED', 'RED'];

        await expect(hasConnectedFour(collection, 3)).resolves.toStrictEqual([3, 4, 5, 6]);
    })

    test('should resolve', async () => {
        const collection: Cell[] = [null, null, null, 'RED', 'RED', 'RED', 'RED'];

        await expect(hasConnectedFour(collection, 4)).resolves.toStrictEqual([3, 4, 5, 6]);
    })

    test('should resolve', async () => {
        const collection: Cell[] = [null, null, null, 'RED', 'RED', 'RED', 'RED'];

        await expect(hasConnectedFour(collection, 5)).resolves.toStrictEqual([3, 4, 5, 6]);
    })

    test('should resolve', async () => {
        const collection: Cell[] = [null, null, null, 'RED', 'RED', 'RED', 'RED'];

        await expect(hasConnectedFour(collection, 6)).resolves.toStrictEqual([3, 4, 5, 6]);
    })

    test('no connected fours with given index, should reject', async () => {
        const collection: Cell[] = ['RED', 'RED', 'RED', 'RED', null, null, null];

        await expect(hasConnectedFour(collection, 4)).rejects.toThrow();
    })

    test('given index out of bound of collection, should reject', async () => {
        const collection: Cell[] = ['RED', 'RED', 'RED', 'RED', null, null, null];

        await expect(hasConnectedFour(collection, 20)).rejects.toThrow();
    })

    test('no connected fours, should reject', async () => {
        const collection: Cell[] = ['RED', null, 'RED', 'RED', null, null, null];

        await expect(hasConnectedFour(collection, 0)).rejects.toThrow();
    })
})

