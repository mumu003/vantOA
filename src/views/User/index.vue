<template>
    <div class="mine">
        <nav-bar :title='title' :isLeftArrow='isLeftArrow' :isFixed='isFixed'></nav-bar>
    </div>
</template>

<script>
export default {
    name:'User',
    data(){
        return{
            title:'我的',
            isLeftArrow:false,
            isFixed:true
        }
    }
}
</script>

<style lang="scss" scoped>

</style>