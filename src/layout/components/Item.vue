<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  render(createElement, context) {
    const { icon, title } = context.props;
    return [
      <i class={[icon, "sub-el-icon"]} />,
      <span slot="title" class="item-title"> {title} </span>,
    ];
  },
};
</script>

<style scoped>
.sub-el-icon {
  margin-right: 12px;
  margin-left: -2px;
}
</style>
