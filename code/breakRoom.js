var firstRoom = new room();

firstRoom.width = 21;
firstRoom.height = 16;

firstRoom.collisionArray[1] =  [true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true];
firstRoom.collisionArray[2] =  [true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true];
firstRoom.collisionArray[3] =  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, true,  true,  true,  true,  true,  true,  true];
firstRoom.collisionArray[4] =  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
firstRoom.collisionArray[5] =  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
firstRoom.collisionArray[6] =  [false, false, false, false, false, false, true,  true,  true,  true,  false, false, false, false, true,  true,  false, false, false, false, false];
firstRoom.collisionArray[7] =  [false, true,  false, false, false, false, true,  true,  false, true,  false, false, false, false, true,  true,  false, false, false, false, false];
firstRoom.collisionArray[8] =  [false, true,  true,  true,  false, false, true,  false, false, true,  false, false, false, false, true,  true,  false, false, false, false, false];
firstRoom.collisionArray[9] =  [false, true,  true,  true,  false, false, true,  false, false, true,  false, false, false, false, false, false, false, false, false, false, false];
firstRoom.collisionArray[10] = [false, false, false, false, false, false, false, false, false, true,  false, false, false, false, false, false, false, false, false, false, false];
firstRoom.collisionArray[11] = [true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  false, false, false, false, true,  true,  false, false, false, false, false];
firstRoom.collisionArray[12] = [true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  false, false, false, false, true,  true,  false, false, false, false, false];
firstRoom.collisionArray[13] = [true,  false, false, true,  false, false, true,  false, false, true,  true,  false, false, false, true,  true,  false, false, false, false, false];
firstRoom.collisionArray[14] = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
firstRoom.collisionArray[15] = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
firstRoom.collisionArray[16] = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

firstRoom.BGArray = [[[0],[0],[0],[0],[0],[0],[0],[1],[0],[0],[0],[0],[1],[2],[3],[4],[0],[0],[0,78],[0,79],[0,79]],
					[[10],[10],[10],[10],[10],[10],[10],[11],[10],[10],[10],[10],[11],[12],[13],[14,103],[10,48],[10,49],[10,88],[10,89],[10,89]],
					[[20],[20],[20],[20],[20],[20],[20],[21],[20],[20],[20],[20],[21],[20],[20,102],[20,113],[20,58],[20,59],[20,98],[20,99],[20,99]],
					[[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30]],
					[[30],[30],[30],[30],[30],[30],[30,40],[30,41],[30,42],[30,9],[30],[30],[30],[30],[30,46],[30,47],[30],[30],[30],[30],[30]],
					[[30],[30,107],[30],[30],[30],[30],[30,50,132],[30,51],[30,52],[30,19],[30],[30],[30],[30],[30,56,131],[30,57,132],[30],[30],[30],[30],[30]],
					[[30],[30,117,107],[30,61],[30,62],[30],[30],[30,60,142,130],[30],[30],[30,19],[30],[30],[30],[30],[30,67,141,140],[30,67,142,130],[30],[30],[30],[30],[30]],
					[[30],[30,117,100],[30,71,105],[30,72,105],[30],[30],[30,60,124],[30],[30],[30,19],[30],[30],[30],[30],[30,66],[30,66],[30],[30],[30],[30],[30]],
					[[30],[30,110],[30,115],[30,115],[30],[30],[30,70],[30],[30],[30,19,125],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30]],
					[[30,6],[30,7],[30,8],[30,6],[30,7],[30,8],[30,6],[30,7],[30,8],[30,19,135],[30],[30],[30],[30],[30,46],[30,47],[30],[30],[30],[30],[30]],
					[[30,16,120],[30,17,121],[30,18,123],[30,16,120],[30,17,121],[30,18],[30,16,120],[30,17,121],[30,18,122],[30,19,102,103],[30],[30],[30],[30],[30,56,131],[30,57,132],[30],[30],[30],[30],[30]],
					[[30,26],[30,27],[30,28],[30,26],[30,27],[30,28],[30,26],[30,27],[30,28],[30,29,113,48],[30,49],[30],[30],[30],[30,67,141,140],[30,67,142,130],[30],[30],[30],[30],[30]],
					[[30,36],[30,37],[30,38],[30,36],[30,37],[30,38],[30,36],[30,37],[30,38],[30,39,58],[30,59],[30],[30],[30],[30,66],[30,66],[30],[30],[30],[30],[30]],
					[[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30]],
					[[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30]],
					[[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30],[30]]];

firstRoom.tallBG = [[1, 5], [2, 6], [3, 6], [14, 4], [15, 4], [14, 9], [15, 9], [10, 11], [0, 9], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [6, 4], [7, 4], [8, 4], [9, 4], [14, 4], [15, 4], [14, 9], [15, 9]];
