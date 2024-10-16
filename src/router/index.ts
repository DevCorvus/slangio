import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CollectionsView from '@/views/CollectionsView.vue';
import CollectionDetailsView from '@/views/CollectionDetailsView.vue';
import { firstTime } from '@/data';
import NewProfileView from '@/views/NewProfileView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/new-profile',
      name: 'new-profile',
      component: NewProfileView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/collections',
      name: 'collections',
      component: CollectionsView
    },
    {
      path: '/collections/:id',
      name: 'collection-details',
      component: CollectionDetailsView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ]
});

router.beforeEach((to) => {
  if (firstTime.value && to.name !== 'new-profile') {
    return { name: 'new-profile' };
  }
});

export default router;
