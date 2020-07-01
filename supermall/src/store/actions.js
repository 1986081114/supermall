const actions = {
  addCar(context,payload) {

    return new Promise ((resolve) => {

      //payload新添加商品
      let oldProduct = null;
      for( let item of context.state.carList){
        if(item.iid === payload.iid) {
          oldProduct = item;
        }
      }
      //2.判断oldProduct
      if( oldProduct) {
        oldProduct.count += 1;
        resolve("当前商品数量+1")
      }else{
        payload.count = 1
        payload.checked = true
        context.state.carList.push(payload)
        resolve("加入购物车成功")

      }

    })


  }
}

export default actions

