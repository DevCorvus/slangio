import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CollectionsView from '@/views/CollectionsView.vue';
import CollectionDetailsView from '@/views/CollectionDetailsView.vue';
import { firstTime } from '@/data';
import NewVaultView from '@/views/NewVaultView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import EditVaultView from '@/views/EditVaultView.vue';
import QuizView from '@/views/QuizView.vue';
import TermsLearnedView from '@/views/TermsLearnedView.vue';
import SupportView from '@/views/SupportView.vue';
import SettingsView from '@/views/SettingsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: '/quiz',
      name: 'quiz',
      component: QuizView
    },
    {
      path: '/learned',
      name: 'learned',
      component: TermsLearnedView
    },
    {
      path: '/new-vault',
      name: 'new-vault',
      component: NewVaultView
    },
    {
      path: '/edit-vault',
      name: 'edit-vault',
      component: EditVaultView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    },
    {
      path: '/support',
      name: 'support',
      component: SupportView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ]
});

router.beforeEach((to) => {
  if (firstTime.value && to.name !== 'new-vault') {
    return { name: 'new-vault' };
  }
});

export default router;
