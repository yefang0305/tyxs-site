const fs = require('fs');
const path = require('path');

// 读取文章数据
const articlesPath = path.join(__dirname, 'articles.json');
let articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

// 找到目标文章
const targetIndex = articles.findIndex(a => a.title === '讲一个「戊辰日柱」的故事 | 六十甲子日柱之戊辰');
if (targetIndex === -1) {
  console.error('❌ 未找到目标文章');
  process.exit(1);
}

// 优化后的内容
const fixedContent = `![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/PdiajNR5WOmeiapLlPdTHfOgPYF0xPOnJoSk1licRAYCljHOlzD3maQtuEUEF2SCFNVCoQPhlibgJZlekykNoyWQicoHNB0FibKSlyY2v67aDFTMY/0?wx_fmt=jpeg)

![](https://mmbiz.qpic.cn/mmbiz_png/PdiajNR5WOmcB4r1n7m9VqEQ6wqrJUP6Z6ShmEibO5Dm1d5p0wT5bIbZiayGKXbO4iblkz9ntIt2RcsccNVnUAib22qAtABtEKicgb2zZ1uGLKbOg/640?wx_fmt=png&from=appmsg)

六十甲子日柱系列：甲子 | 乙丑 | 丙寅 | 丁卯，这是第五期：戊辰。

老黄是我的老朋友，在一家工厂做了十五年的车间主任。厂里换了好几任厂长，老黄的位置雷打不动。不是因为他有什么背景，而是因为他把车间管得太稳了。

稳到什么程度？设备故障率、良品率、人员出勤率，这些数据他每周做一次表，十五年来从没断过。厂长们来了又走，只有老黄和他的报表还钉在车间门口。

去年冬天，他约我喝茶。做我们这行的跟人吃饭聊天，聊着聊着不自觉就会聊到八字啊、风水啊、玄学的东西，这次也不例外。老黄平时也会刷我的文章，知道我最近在更新一个「六十甲子日柱系列」，就问我了我一个问题：
"师兄，你说这四柱里头日柱到底代表什么？"

我看了他的八字。日柱，戊辰。（我今天刚好更新到戊辰，就以讲老黄故事的形式发出来。）

我跟他说，日柱是内在的你，是独处时候的那个你，是你以为自己是谁的那个你。

他说听不懂。我说没关系，你就记住一件事：你这辈子，最值钱的东西就是一个字：稳。

他听完笑了，说师兄你这话说得，跟我们厂长开会说的差不多。
我说不一样。你们厂长说的稳，是让你别惹事。我说你的稳，是戊辰这个日柱骨子里的东西。你表面看起来像一座山，不动声色，但山底下，其实大有文章。

老黄的戊辰，戊土是高山，坐下的辰不仅是土，它还是个水库。辰里头藏着癸水正财，乙木正官。这就意味着，这座山不是光秃秃的石头山，山底下聚着水，山上长着树。

这种人天生不是那种“傻稳”，而是极度的“内秀”和“务实”。这种人有个特点：他们极度相信自己的判断，不需要外界的虚名来背书。他们做事的逻辑不是讨好谁或者博眼球，而是这件事情能不能落地（正财），符不符合规矩（正官）。

我认识另一个戊辰日的老板，干工程的。每年几千万流水，公司连个像样的官网都没有。我问他为什么不做宣传，他说有用吗？工程质量做不好，钱拿不到手，宣传再好也是白搭。

这种人在社交场合往往不起眼。在饭局上，他们不爱敬酒，不吹牛，话也不多。因为正财和正官的特质，让他们本能地排斥那些务虚的、不可控的场面话。但你要真把他放到事上去，他能给你稳稳当当地扛下来，而且账目和流程给你算得清清楚楚。

戊辰日生人，最怕的不是穷，是失控。正官要的是秩序，正财要的是数据。环境一乱，规矩被打破，他们就容易失去安全感。不是能力出问题，是心态上会很别扭。所以他们做事往往按部就班，喜欢把所有变量都算死，就像老黄那十五年没断过的报表，那就是他对抗无序的武器。

这两年大环境不好，很多行业都在洗牌。我见过有些聪明人今天追这个风口、明天换那条赛道，折腾几年下来，反而不如几个戊辰的人日子过得好。那些聪明人追求的是偏财的暴利和伤官的捷径，而他们缺的，恰恰是戊辰最不缺的东西：守得住自己的财库，不干没把握的事。

老黄后来跟我说，他想了想自己这半辈子，确实是这样。没追过什么大运，也没踩过什么大坑，就是一步步按规矩走，走到现在。回头一看，同龄人里他算不上最风光的，但日子过得最踏实、最殷实。

我说这就对了。戊辰日柱的人，最高的境界，就是表面稳到别人都替你着急，但你自己水库里的账，比谁算得都精。人生这东西，底盘能扎得这么深的人，其实没几个。
`;

// 更新内容
articles[targetIndex].content = fixedContent;

// 保存
fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), 'utf8');
const reactArticlesPath = path.join(__dirname, 'tyxs-react', 'public', 'articles.json');
fs.writeFileSync(reactArticlesPath, JSON.stringify(articles, null, 2), 'utf8');

console.log('✅ 戊辰日柱文章修复完成');
console.log('修复的问题：');
console.log('1. 清理了开头重复标题、作者信息、公众号跳转链接');
console.log('2. 重新拆分段落，添加合适的换行，阅读体验流畅');
console.log('3. 移除了中间的公众号内链');
console.log('4. 清理了底部的阅读原文、作者头像等冗余内容');
console.log('5. 保留了所有原文内容和故事完整性');
