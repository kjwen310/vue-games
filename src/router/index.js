import { createRouter, createWebHashHistory } from 'vue-router';
import Start from '../views/Start.vue';
import GameBoard from '../views/GameBoard.vue';
import GameOne from '../views/GameOne.vue';
import GameTwo from '../views/GameTwo.vue';
import GameThree from '../views/GameThree.vue';
import Complete from '../views/Complete.vue';

const routes = [
  {
    path: '/',
    name: 'Start',
    component: Start,
  },
  {
    path: '/gameBoard',
    name: 'GameBoard',
    component: GameBoard,
    children: [
      {
        path: 'gameone',
        name: 'GameOne',
        component: GameOne,
      },
      {
        path: 'gametwo',
        name: 'GameTwo',
        component: GameTwo,
      },
      {
        path: 'gamethree',
        name: 'GameThree',
        component: GameThree,
      },
    ],
  },
  {
    path: '/complete',
    name: 'Complete',
    component: Complete,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
