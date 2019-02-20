const fs = require("fs");
const path = require("path");
const { loop, createFormItemByType } = require("../tool");
module.exports = plop => obj =>
  new Promise(resolve => {
    const dataName = obj.dataName;
    fs.readFile(
      path.join(__dirname, `../data/${dataName}.json`),
      "utf8",
      (err, d) => {
        const data = JSON.parse(d);
        const option = data.data;
        const labelWidth = data.labelWidth;
        let form = `
        <div class="form">
          <el-form ref="form" :model="form" :disabled="formDisabled" label-width="${labelWidth ||
            120}px">
              ${loop(
                option,
                item =>
                  `<el-form-item label="${item.name}：">
                    ${createFormItemByType("form", item)}
                  </el-form-item>`
              )}
              <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button @click="onCancel">取消</el-button>
              </el-form-item>
          </el-form>
        </div>
        `;
        let formData = `
          form: {
            ${loop(option, ({ key, defaultValue, type }) => {
              if (type === "checkbox-group") {
                return `${key}: [],`;
              }

              if (type === "switch") {
                return `${key}: ${defaultValue ? "true" : "false"},`;
              }

              return `${key}: ${
                typeof defaultValue === "string"
                  ? '"' + defaultValue + '"'
                  : defaultValue
              },`;
            })}
          },
          formDisabled: false
        `;
        let methods = `
          onSubmit() {
            console.log(this.form)
          },
          onCancel() {},
        `;
        plop.setPartial("form", form);
        plop.setPartial("formData", formData);
        plop.setPartial("methods", methods);
        resolve();
      }
    );
  });
