<template>
  <div class="main-wrapper ">
    <div class="crumbs">
      <slot name="header">
        商品列表
      </slot>
    </div>
<div class="main-section">
    <slot  name="main">

    </slot>
    </div>
  </div>
</template>
<style>
  .crumbs {
    height: 55px;
    background: #fff;
    padding-left: 20px;
    line-height: 55px;
    font-size: 14px;
    color: #666666;
    border-bottom: 1px solid #E6E6E6;
  }

  .main-section {
    margin: 20px 20px 50px 20px;
    /*background-color: #fff;*/
  }

  .main-wrapper {
    min-height: 100%;
   
    /* background-color: #f6f7f7; */
    
  }

</style>
