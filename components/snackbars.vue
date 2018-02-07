<template functional>
  <div class="snackbars">
    <notifications
      :group="props.group"
      :duration="60000"
      :speed="600"
      position="top right"
    >
      <template slot="body" slot-scope="{ item, close }">
        <v-container fluid grid-list-lg class="snackbar">
          <v-layout row>
            <v-flex xs7 class="white--text">
              <div class="subheading" v-if="item.title">
                {{item.title}}
              </div>
              <div class="body-2" v-if="item.text">
                {{item.text}}
              </div>
            </v-flex>
            <v-flex xs5>
              <v-btn color="pink" flat @click.stop="close">
                <span class="btn-label body-2">閉じる</span>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </template>
    </notifications>
  </div>
</template>

<style scoped lang="stylus">
.snackbar
  max-width 568px
  min-width 288px
  background rgb(50, 50, 50)
  border 2px solid #D0F2E1
  transition all 500ms

.btn-label
  font-weight: 540

.v-fade-right-enter-active
.v-fade-right-leave-active
.v-fade-right-move
  transition all .5s

.v-fade-right-enter
.v-fade-right-leave-to
  opacity 0
  transform translateX(500px) scale(0.2)
</style>
