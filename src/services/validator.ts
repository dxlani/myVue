import VeeValidate,{ Validator } from 'vee-validate'
import {Vue} from 'vue-property-decorator'
Vue.use(VeeValidate, {locale:'zh_CN'});
Validator.extend('phone', {
    getMessage: (field, [args]) => `请输入正确的手机号码`,
    validate: (value, [args]) =>{
        const reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        return reg.test(value) 
    }  
});
Validator.extend('cName', {
    getMessage: (field, [args]) => `只能包含文字，数字以及大小写字母（2-15个字符之间）`,
    validate: (value, [args]) =>{
        const reg = /^[\u4e00-\u9fa5a-zA-Z0-9()\（\）]{2,15}$/;
        return reg.test(value) 
    }  
});
 Validator.extend('required', {
     getMessage: (field, [args]) => `这是必填项`,
     validate: (value, [args]) =>{
        const reg = /\S+/;
        return reg.test(value) 
    }  
 });



//<input v-validate="'required|email'" type="text" name="email">
//<input v-validate="{ required: true, email: true, regex: /[0-9]+/ }" type="text" name="email">