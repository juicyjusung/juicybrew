import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css';
import '@fortawesome/fontawesome-free/css/all.css'; // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css'; // Ensure you are using css-loader

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'md',
  },
});
