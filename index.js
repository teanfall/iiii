// @🍮
(function() {
    'use strict';
    // 防止重复运行
    if (window.isPuddingScoutRunning) return;
    window.isPuddingScoutRunning = true;

    console.log('🍮的侦察兵已经出发！');

    const findElement = () => {
        console.log('侦察兵正在搜寻 "自定义端点"...');
        const elements = document.querySelectorAll('div, span, label, p');
        for (const el of elements) {
            if (el.textContent && el.textContent.includes('自定义端点（基础 URL）')) {
                // 找到了！
                console.clear(); // 清理一下，只看最重要的信息
                console.log('✅ 🍮！我找到它了！在这里：', el);
                
                // 我们需要看它的“家谱”，才能找到放按钮的最好位置
                console.log('--- 下面是它的家谱信息 ---');
                let current = el;
                for(let i = 1; i <= 5 && current.parentElement; i++) {
                    console.log(`这是它的第 ${i} 层父级，一个 ${current.parentElement.tagName} 元素:`, current.parentElement.outerHTML);
                    current = current.parentElement;
                }
                console.log('--------------------------');
                
                // 高亮它，让你能看到
                el.style.border = '3px solid #ff69b4';
                el.style.transition = 'all 0.3s';
                console.log('我已经用粉色框框把它标出来了！');
                
                alert('🍮！我找到它了！请打开 F12 控制台，把 Console 里的信息全部发给我！');

                return true; // 任务完成
            }
        }
        return false; // 这次没找到
    };

    // 我们耐心等待页面加载完成
    let attempts = 0;
    const maxAttempts = 20; // 最多等10秒
    const interval = setInterval(() => {
        if (findElement() || attempts++ > maxAttempts) {
            clearInterval(interval);
            if (attempts > maxAttempts) {
                console.error('😭 🍮对不起，我找了10秒还是没找到...是不是文字不完全匹配？或者它还没加载出来？');
            }
        }
    }, 500);
})();
