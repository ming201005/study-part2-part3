import { createNamespace } from '../../utils';
import Stepper from '../../stepper';
import { LIMIT_TYPE } from '../constants';
var namespace = createNamespace('sku-stepper');
var createComponent = namespace[0];
var t = namespace[2];
var QUOTA_LIMIT = LIMIT_TYPE.QUOTA_LIMIT,
    STOCK_LIMIT = LIMIT_TYPE.STOCK_LIMIT;
export default createComponent({
  props: {
    stock: Number,
    skuEventBus: Object,
    skuStockNum: Number,
    selectedNum: Number,
    stepperTitle: String,
    disableStepperInput: Boolean,
    customStepperConfig: Object,
    quota: {
      type: Number,
      default: 0
    },
    quotaUsed: {
      type: Number,
      default: 0
    }
  },
  data: function data() {
    return {
      currentNum: this.selectedNum,
      // 购买限制类型: 限购/库存
      limitType: STOCK_LIMIT
    };
  },
  watch: {
    currentNum: function currentNum(num) {
      this.skuEventBus.$emit('sku:numChange', num);
    },
    stepperLimit: function stepperLimit(limit) {
      if (limit < this.currentNum) {
        this.currentNum = limit;
      }
    }
  },
  computed: {
    stepperLimit: function stepperLimit() {
      var quotaLimit = this.quota - this.quotaUsed;
      var limit; // 无限购时直接取库存，有限购时取限购数和库存数中小的那个

      if (this.quota > 0 && quotaLimit <= this.stock) {
        // 修正负的limit
        limit = quotaLimit < 0 ? 0 : quotaLimit;
        this.limitType = QUOTA_LIMIT;
      } else {
        limit = this.stock;
        this.limitType = STOCK_LIMIT;
      }

      return limit;
    }
  },
  methods: {
    setCurrentNum: function setCurrentNum(num) {
      this.currentNum = num;
    },
    onOverLimit: function onOverLimit(action) {
      this.skuEventBus.$emit('sku:overLimit', {
        action: action,
        limitType: this.limitType,
        quota: this.quota,
        quotaUsed: this.quotaUsed
      });
    },
    onChange: function onChange(currentValue) {
      var handleStepperChange = this.customStepperConfig.handleStepperChange;
      handleStepperChange && handleStepperChange(currentValue);
      this.$emit('change', currentValue);
    }
  },
  render: function render() {
    var _this = this;

    var h = arguments[0];
    return h("div", {
      "class": "van-sku-stepper-stock"
    }, [h("div", {
      "class": "van-sku-stepper-container"
    }, [h("div", {
      "class": "van-sku__stepper-title"
    }, [this.stepperTitle || t('num')]), h(Stepper, {
      "class": "van-sku__stepper",
      "attrs": {
        "max": this.stepperLimit,
        "disableInput": this.disableStepperInput
      },
      "on": {
        "overlimit": this.onOverLimit,
        "change": this.onChange
      },
      "model": {
        value: _this.currentNum,
        callback: function callback($$v) {
          _this.currentNum = $$v;
        }
      }
    })])]);
  }
});