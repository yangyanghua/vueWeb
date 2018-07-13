<!-- <div v-for="(item, index) in slotArr" :key="index" slot="item">{{index}}</div>
      <div>
        <div slot="popup"></div>
        <div slot="carousel"></div>
        <div slot="entry"></div>
        <div slot="seize"></div>
      </div> -->
<!-- <slot name="popup">popup</slot>
    <slot name="carousel">carousel</slot>
    <slot name="entry">entry</slot>
    <slot name="seize">seize</slot>
    <slot name="inform">inform</slot> -->
// this.slotStr = location.hash.slice(7);
      // let index = this.slotArr.indexOf(this.slotStr);
      // if (index > -1) {
      //   this.slotArr.splice(index, 1);
      // }
this.currentView = location.hash.slice(7);

<router-link class="navlist-item" 
        v-for="(item) in navData.navList" :class="[item.icon, (navData.navLevelFirst==item.id)?'active':'']" :key="item.id" :to="item.link" > 
         {{item.name}}
        </router-link>

<router-link :to="item.link">{{item.name}}</router-link>

Service.goodslistPage(this.goodsParams).then((res) => { 
  this.goodsDataset = [...res.data];
  this.goodsTotalRecord = res.totalRecord;
  console.log(this.goodsDataset)
  // this.$message({
  //   type: 'success',
  //   message: '成功'
  // });
}).catch((res) => {})

createArr(){
let newArr = [];
let len = this.carouselConfig.sub_entry.length;

for(let i=0;i<len;i++){
  newArr.push(this.carouselConfig.sub_entry[i][arguments[0]]);
}
return newArr;
},