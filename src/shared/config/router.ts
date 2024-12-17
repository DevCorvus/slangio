import { createRouter, createWebHistory } from 'vue-router';
import CollectionDetailsView from '@/features/collection-details/views/CollectionDetailsView.vue';
import CollectionListView from '@/features/collection-list/views/CollectionListView.vue';
import HomeView from '@/features/home/views/HomeView.vue';
import TermsLearnedView from '@/features/learned-terms/views/TermsLearnedView.vue';
import QuizView from '@/features/quiz/views/QuizView.vue';
import { firstTime } from '@/shared/data/firstTime';
import NotFoundView from '@/shared/views/NotFoundView.vue';
import SettingsView from '@/shared/views/SettingsView.vue';
import SupportView from '@/shared/views/SupportView.vue';
import EditVaultView from '@/shared/views/EditVaultView.vue';
import NewVaultView from '@/shared/views/NewVaultView.vue';

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
      component: CollectionListView
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
