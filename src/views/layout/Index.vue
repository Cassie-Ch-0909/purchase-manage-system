<script setup>
import Menu from './menu/Menu.vue'
import Main from './content/Main.vue'
</script>
<template>
    <div class="menu">
        <Menu />
    </div>
    <div class="content">
        <Main />
    </div>
</template>
<style lang="scss" scoped>
.menu{
    width: 200px;
    position: fixed;
    top: 0;
    left: 0;
    bottom:0;
    background: #112f50;
}
.content{
    padding-left: 200px;
}
</style>
