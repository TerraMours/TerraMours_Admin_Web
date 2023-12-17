import { defineStore } from 'pinia';

interface ChatState {
  /** 当前会话id */
  activeId: number;
  siderCollapsed: boolean;
}

export const useChatState = defineStore('chat-store', {
  state: (): ChatState => ({
    activeId: 0,
    siderCollapsed: false
  }),
  getters: {
    /** 是否登录 */
    active(state) {
      return state.activeId;
    }
  },
  actions: {
    async setActive(uuid: number) {
      this.activeId = uuid;
    },
    setSiderCollapsed(collapsed: boolean) {
      this.siderCollapsed = collapsed;
    }
  }
});
