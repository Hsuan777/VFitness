<template>
  <section>
    <!-- 關於工作室 banner -->
    <figure
      class="studio__banner studio__banner__secondary studio__banner__about
        d-flex justify-content-center align-items-center mb-5"
    >
      <h2 class="studio__banner__title text-white fw-bolder p-4 rounded">關於工作室</h2>
    </figure>
    <!-- 關於工作室內容 -->
    <div class="studio__about container-fluid px-lg-0">
      <!-- 健身運動 -->
      <div class="row g-0 flex-row-reverse mb-5 mb-md-0">
        <div class="col-md-6 d-flex justify-content-center align-items-center">
          <div class="row p-3">
            <div class="col-lg-8 mx-auto">
              <h3 class="text-center">健身運動</h3>
              <p data-aos="fade-up" data-aos-duration="1000">
                沒有人天生就是個胖子，也不需要因外表而自卑，選擇健身這項運動，可以讓我們的生活可以更好，運動能釋放我們自身的壓力，同時也能獲得良好的體態。
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <img
            src="@/assets/images/about/gym.jpg"
            alt="健身運動"
          />
        </div>
      </div>
      <!-- 專業教練 -->
      <div class="row g-0 mb-5 mb-md-0">
        <div class="col-md-6 d-flex justify-content-center align-items-center">
          <div class="row p-3">
            <div class="col-lg-8 mx-auto">
              <h3 class="text-center">專業教練</h3>
              <p data-aos="fade-up" data-aos-duration="1000">
                練得好的人不一定會教學，所以我們除了訓練自己外，也會安排教練進修，希望能帶給學員更好的運動經驗。
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <img
            src="@/assets/images/about/proCoach.jpg"
            alt="專業教練"
          />
        </div>
      </div>
      <!-- 成立契機 -->
      <div class="row g-0 flex-row-reverse mb-5">
        <div class="col-md-6 d-flex flex-column justify-content-center">
          <div class="row p-3">
            <div class="col-lg-8 mx-auto">
              <h3 class="text-center">成立契機</h3>
              <p data-aos="fade-up" data-aos-duration="1000">
                創立人以前是個胖子，直到接觸健身後，才慢慢戒掉手搖飲料、高糖分食物，學到更多健身經驗後，
                才了解到更重要的是我們的生活與飲食習慣不佳，希望藉由工作室，讓更多人了解健身這項運動。
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <img
            src="@/assets/images/about/juncture.jpg"
            alt="成立契機"
          />
        </div>
      </div>
    </div>
    <Subscribe/>
  </section>
</template>

<script>
import Subscribe from '@/components/frontend/Subscribe.vue';

export default {
  components: {
    Subscribe,
  },
};
</script>
