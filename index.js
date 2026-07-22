import { getContext } from '../../extensions.js';
const context = getContext();
const extName = 'api-preset-manager';

// 读取保存的预设
function getPresetList() {
    if (!context.extensionSettings[extName]) context.extensionSettings[extName] = {};
    if (!context.extensionSettings[extName].list) context.extensionSettings[extName].list = [];
    return context.extensionSettings[extName].list;
}

// 储存预设
function savePreset(name, url, key, modelName) {
    const arr = getPresetList();
    arr.push({ name, url, key, modelName });
    context.saveSettingsDebounced();
    renderUI();
    toastr.success('保存完成');
}

// 一键套用API配置
function applyConfig(item) {
    $('#custom_endpoint').val(item.url);
    $('#api_key').val(item.key);
    context.selectModel(item.modelName);
    toastr.success('已切换API预设');
}

// 渲染按钮列表
function renderUI() {
    let html = '';
    getPresetList().forEach(item => {
        html += `<button class="preset-btn">${item.name}</button>`;
    });
    $('#preset_box').html(html);
    $('.preset-btn').on('click', function () {
        const title = $(this).text();
        const data = getPresetList().find(x => x.name === title);
        applyConfig(data);
    })
}

// 在API区域插入面板
jQuery(() => {
    const block = `
    <div class="api-preset-area">
        <h4>API预设管理器</h4>
        <div id="preset_box"></div>
        <div class="row-flex">
            <input id="preset_title" placeholder="命名这个配置">
            <button id="save_current_cfg">保存当前API设置</button>
        </div>
    </div>
    `;
    $('#api_config_block').after(block);

    $('#save_current_cfg').on('click', () => {
        const title = $('#preset_title').val().trim();
        if (!title) return toastr.warning('请填写名字');
        const endpoint = $('#custom_endpoint').val();
        const apikey = $('#api_key').val();
        const model = context.getSelectedModel();
        savePreset(title, endpoint, apikey, model);
    });
    renderUI();
})
