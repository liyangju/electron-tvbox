const jarRegex = /(?<=['"]?\s*spider\s*['"]?\s*:\s*['"]\s*(img\+)?)(https?:\/\/|\.\/)([^'"\s]+\/)?([^'"\s;?}]+)/g;

const linkRegex = /(?<!['"]\s*spider\s*['"]\s*:\s*['"])(?<=['"]\s*)(https?:\/\/|\.\/)(?:[^'"\s]+\/)?((?!tok)[^'"\s\/]+\.(?:json|js|py|jar|txt|m3u)(\?[^'"\s]+)?)(?=\s*['";])/g;

const wallpaperRegex = /(['"]wallpaper['"]\s*:\s*)(['"][^'"]*['"])/g;

const drpyRegex = /(import[^"']*["'])([^"']*\/)?([^"']*?\.(js|jsx|ts|tsx))/g;

const jsonerrRegex = /['"]\s*(\w+)\s*['"]\s*:\s*([\w\u4e00-\u9fa5\-]+)\s*['"]/g;

const tokenRegex = /(['"]\s*api\s*['"]\s*:\s*['"]\s*(csp_Paper|csp_YiSo|csp_PanSou|csp_UpYun|csp_Push|csp_Zhaozy|csp_Dovx|csp_WoGG|csp_PanSearch|csp_TuGou|csp_Upyunso|csp_AliPS|csp_Yiso|csp_PushAgent|csp_Gitcafe)\s*['"].+['"]\s*ext\s*['"]\s*:\s*)(['"][^'"]*['"])/g

export default {
	jarRegex,
    linkRegex,
    wallpaperRegex,
    drpyRegex,
    jsonerrRegex,
    tokenRegex
}