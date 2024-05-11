/* 
    存储编辑的商品信息
*/
import { defineStore } from 'pinia'
const useGoodsStore = defineStore("goods", {
  state: () => {
    return {
      title: "添加",
      rowData: {}
    };
  },
  actions: {
    setRowData(payload) {
      this.title = payload.title;
      this.rowData = payload.rowData;
    }
  }
});
export default useGoodsStore;
