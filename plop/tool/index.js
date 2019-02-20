const loop = (arr, func) => arr.map(item => func(item)).join("");

const createFormItemByType = (formName, item) => {
  const {
    type,
    placeholder,
    key,
    options,
    dateType,
    rangeSeparator,
    startPlaceholder,
    endPlaceholder
  } = item;
  if (type === "text" || type === undefined) {
    // 普通输入框
    return `
    <el-input
      placeholder="${placeholder || "请输入"}"
      v-model="${formName}.${key}"
    />`;
  } else if (type === "select") {
    // 普通选择框
    return `
    <el-select
      v-model="${formName}.${key}"
      placeholder="${placeholder || "请选择"}"
    >
      ${loop(
        options,
        ({ label, value }) => `<el-option label="${label}" value="${value}" />`
      )}
    </el-select>
    `;
  } else if (type === "checkbox-group") {
    // 多选框
    return `
    <el-checkbox-group
      v-model="${formName}.${key}"
    >
      ${loop(
        options,
        ({ label, name }) => `<el-checkbox label="${label}" name="${name}" />`
      )}
    </el-checkbox-group>
    `;
  } else if (type === "radio-group") {
    // 单选框
    return `
    <el-radio-group
      v-model="${formName}.${key}"
    >
      ${loop(options, ({ label }) => `<el-radio label="${label}" />`)}
    </el-radio-group>
    `;
  } else if (type === "date") {
    // 日期选择框
    return `
    <el-date-picker
      v-model="${formName}.${key}"
      placeholder="${placeholder || "请输入"}"
      type="${dateType || "date"}"
    />
    `;
  } else if (type === "daterange") {
    // 日期选择框
    return `
    <el-date-picker
      v-model="${formName}.${key}"
      type="daterange"
      range-separator="${rangeSeparator || "-"}"
      start-placeholder="${startPlaceholder || "开始日期"}"
      end-placeholder="${endPlaceholder || "结束日期"}"
    />
    `;
  } else if (type === "switch") {
    return `<el-switch v-model="${formName}.${key}" />`;
  } else if (type === "rate") {
    return `<el-rate v-model="${formName}.${key}" />`;
  } else if (type === "textarea") {
    return `<el-input type="textarea" v-model="${formName}.${key}" />`;
  }
};

module.exports = {
  loop,
  createFormItemByType
};
