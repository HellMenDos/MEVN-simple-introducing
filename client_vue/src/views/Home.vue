<template>
  <div class="home">
    <index />
    <second_index />
    <courses_list />
  </div>
</template>

<script>
// @ is an alias to /src
import index from '@/components/index.vue'
import second_index from '@/components/second_index.vue'
import courses_list from '@/components/courses_list.vue'

export default {
  name: 'Home',
  components: {
    index,
    second_index,
    courses_list
  }
}
</script>
