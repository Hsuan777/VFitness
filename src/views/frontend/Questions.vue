<template>
  <div>
    <section class="container-fluid px-lg-0 mb-5">
      <figure
        class="studio__banner studio__banner__questions
          d-flex align-items-center mb-5"
      >
        <h2 class="studio__banner__title text-white fw-bolder p-4 rounded">常見問答</h2>
      </figure>
      <div class="container">
        <div class="row">
          <div class="col">
            <ul class="list-unstyled">
              <li class="mb-3" v-for="(item, key) in questions" :key="item.title + key">
                <div class="card">
                  <div class="card-header d-flex align-items-center bg-white border-0">
                    <span class="bg-primary text-white rounded p-1 me-3">Q{{ key + 1 }}</span>
                    <a
                      :href="`#collapseA${key + 1}`"
                      class="h5 mb-0 stretched-link text-decoration-none"
                      @click.prevent="item.isOpen = !item.isOpen"
                      >{{ item.title }}
                    </a>
                    <span class="material-icons ms-auto" v-if="item.isOpen">keyboard_arrow_up</span>
                    <span class="material-icons ms-auto" v-else>keyboard_arrow_down</span>
                  </div>
                  <div
                    v-if="item.isOpen"
                    :id="`collapseA${key + 1}`"
                    class="transition card-body border-top"
                  >
                    <p class="mb-0">{{ item.description }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <subscribe></subscribe>
  </div>
</template>

<script>
import subscribe from '../../components/frontend/Subscribe.vue';

export default {
  data() {
    return {
      questions: [
        {
          title: '買了課程沒時間上課怎麼辦?',
          description:
            '再請您與我們協調可上課的時間，我們會想辦法讓每個想運動的人都能排除萬難的來上課。',
          isOpen: true,
        },
        {
          title: '上了課，卻發現活動度不足跟不上別人怎麼辦?',
          description:
            '別擔心，大部分都是因為生活或工作造成的肌肉緊繃，適當的按摩放鬆，通常可以花時間解決。另外，我們也有配合的物理治療師，可以快速找到您的根本問題。',
          isOpen: true,
        },
        {
          title: '餐飲都是誰做的?',
          description: '我們的餐飲都是專業的廚師親手製作，手沖咖啡則是工作室創立人的愛好。',
          isOpen: true,
        },
        {
          title: '餐點可以外送嗎?',
          description: '可以，不跨區都能外送。',
          isOpen: true,
        },
        {
          title: '你們有甚麼器材可以訓練?',
          description:
            '我們有不同重量的啞鈴，龍門架兩座，握推椅兩張，槓子兩根，不同重量的槓片，另外還有軟墊區可以做不同的訓練。我們屬於小型工作室，若空間許可會再進不同訓練器材。',
          isOpen: true,
        },
        {
          title: '教練的專業程度如何?',
          description:
            '練得好的人不一定會教學，所以我們除了訓練自己外，也會安排教練進修，希望能帶給學員更好的運動經驗。室內會放上教練的證照，給您參考。',
          isOpen: true,
        },
      ],
    };
  },
  components: {
    subscribe,
  },
};
</script>
