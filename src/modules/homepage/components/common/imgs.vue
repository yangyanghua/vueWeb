<template>
  <ul class="list js-sort">
      <li v-for="(item,index) in imgList" class="item js-dragImg" draggable="true">
        <img class="img" :src="item.url" alt="">
            <i @click="deleteImg(index)" class="el-icon-circle-close icon-close" ></i>
      </li>
  </ul>
</template>
<script>
export default {
    data(){
        return {
            imgList: [
                {
                    url: 'http://img01.sys.iflashbuy.com:8282/group2/M00/00/49/wKgFZFp5IQWAX9qwAAAX6saYdVA577.jpg',
                    goodsId: 1
                },
                {
                    url: 'http://img01.sys.iflashbuy.com:8282/group2/M00/00/49/wKgFZFp6xUSAX14XAAAQHodv43Y242.3gp',
                    goodsId: 2
                },
                {
                    url: 'http://img01.sys.iflashbuy.com:8282/group2/M00/00/49/wKgFZFp6xUSAX14XAAAQHodv43Y242.3gp',
                    goodsId: 3
                }
            ],
            startItem: null,
            endItem: null
        }
    },
    methods: {
        deleteImg(index){
            this.imgList.splice(index,1);
        }
    },
    mounted(){
        $(".js-sort")[0].sortable({
  stop: function( event, ui ) {
      console.log('ee ', event, ui);
  }
});
        return;
        $('.js-dragImg').on({
            dragstart: function(e){
                this.startItem = $(this);
            },
            dragover: function(e){
                e.preventDefault();
                // console.log($(this));
            },
            drop: function(e){
                this.endItem = $(this);
                console.log('drop ', this.endItem, $(this).index, 'from ', this.startItem);
            }
        });
    }

}
</script>
<style lang="scss" scoped>
.list{
    display: inline-block;
}
.item{
    position: relative;
        display: inline-block;
    width: 50px;
    height: 50px;
    border: 1px dashed #ddd;
    margin-right: 10px;
    &:hover{
        .icon-close{
            display: inline-block;
        }
    }
}
.img{
    width: 100%;
    height: 100%;
}
.icon-close{
    display: none;
    cursor: pointer;
    font-size: 16px;
    position: absolute;
    top: -8px;
    right: -8px;
    color: $color-light;
    &:hover{
        color: $color-primary;
    }
}
</style>

