<template>
  <div>
    <section class="studio__about container-fluid px-lg-0 my-5">
      <h2 class="text-center fw-bolder mb-5">關於工作室</h2>
      <div class="row g-0 flex-column flex-md-row">
        <div class="col">
          <img
            src="https://images.unsplash.com/photo-1519859660545-3dea8ddf683c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="健身運動"
            class="w-100"
          />
        </div>
        <div class="col d-flex justify-content-center align-items-center">
          <div class="row p-3">
            <div class="col-lg-8 mx-auto">
              <h3 class="text-center fw-bolder">健身運動</h3>
              <p>
                沒有人天生就是個胖子，也不需要因外表而自卑，選擇健身這項運動，可以讓我們的生活可以更好，運動能釋放我們自身的壓力，同時也能獲得良好的體態。
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row g-0 flex-column flex-md-row flex-md-row-reverse">
        <div class="col">
          <img
            src="https://images.unsplash.com/photo-1614928228253-dc09cbc3b11c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
            alt="健身運動"
            class="w-100"
          />
        </div>
        <div class="col d-flex justify-content-center align-items-center">
          <div class="row p-3">
            <div class="col-lg-8 mx-auto">
              <h3 class="text-center fw-bolder">專業教練</h3>
              <p>
                練得好的人不一定會教學，所以我們除了訓練自己外，也會安排教練進修，希望能帶給學員更好的運動經驗。
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row g-0 flex-column flex-md-row">
        <div class="col">
          <img
            src="https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
            alt="健身運動"
            class="w-100"
          />
        </div>
        <div class="col d-flex flex-column justify-content-center">
          <div class="row p-3">
            <div class="col-lg-8 mx-auto">
              <h3 class="text-center fw-bolder">成立契機</h3>
              <p class="">
                創立人以前是個胖子，直到接觸健身後，才慢慢戒掉手搖飲料、高糖分食物，學到更多健身經驗後，
                才了解到更重要的是我們的生活與飲食習慣不佳，希望藉由工作室，讓更多人了解健身這項運動。
              </p>
            </div>
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
  components: {
    subscribe,
  },
};
</script>
