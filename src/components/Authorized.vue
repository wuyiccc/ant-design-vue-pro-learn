<!--全局校验组件-->
<script>
import { check } from "../utils/auth";
export default {
  name: "Authorized",
  functional: true,
  props: {
    authority: {
      type: Array,
      required: true
    }
  },
  render(h, context) {
    // console.log("####check props.authority");
    const { props, scopedSlots } = context;
    // 如果满足权限, 将包裹的组件返回，如果不满足权限，则返回null，即不显示该组件
    console.log("####check props.authority");
    console.log(check(props.authority));
    return check(props.authority) ? scopedSlots.default() : null;
  }
};
</script>

<style scoped></style>
