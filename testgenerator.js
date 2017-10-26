arr1 = [1,2,3,4,5];
arr2 = [11,22,33,44,55];

function* generateCollisions(arr1, arr2) {
  for(let elArr1 of arr1) {
  	for  (let elArr2 of arr2){
      if (
        (
          (
            (elArr1.x_position + elArr1.width >= elArr2.x_position) && //elArr1 слева от elArr2
            (elArr1.x_position <= elArr2.x_position + elArr2.width)
          )
          ||
          (
            (elArr1.x_position <= elArr2.x_position + elArr2.width ) && //elArr1 слева от elArr2
            (elArr1.x_position + elArr1.width >= elArr2.x_position)
          )
        )
        &&
        (
          (
            (elArr1.y_position + elArr1.height >= elArr2.y_position) &&  // elArr1 сверху от elArr2
            (elArr1.y_position <= elArr2.y_position + elArr2.height)
          )
          ||
          (
            (elArr1.y_position <= elArr2.y_position + elArr2.height) &&  //elArr1 снизу от elArr2
            (elArr1.y_position + elArr1.height >= elArr2.y_position)
          )
        )
      )
      {
        yield [elArr1,elArr2];
      }
		}
  }
return 0;
}

for(let i of generateCollisions(arr1,arr2)) {
  console.log(i);
}