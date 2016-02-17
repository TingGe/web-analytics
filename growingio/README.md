# 用户行为分析
——GrowingIO

## 个人对其评价
Data Driven ＋ Growth Hack 的实践和推动者

## GrowingIO 优势
1. Core Product Value：用数据帮助企业增长业务
2. Magic Monment：通过圈选功能，可视化地建立标签、指标和单图
3. Top of Funnel：流量到转化率

## 所需要分析页面中代码

	<script type='text/javascript'>
		var _vds = _vds || [];
		window._vds = _vds;
		(function(){
		_vds.push(['setAccountId', '3be1e6ea787c4b6aa3ebb658153a36a7']);
		(function() {
			var vds = document.createElement('script');
			vds.type='text/javascript';
			vds.async = true;
			vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(vds, s);
		})();
		})();
	</script>

详见 GrowingIO 帮助文档简介的[SDK接入指南（JS）](https://help.growingio.com/SDK/JS.html)

## 主控脚本 vds.js
http://dn-growing.qbox.me/vds.js

源码分析参见：

## 打点

### 进入页面

#### https://api.growingio.com/events?stm=1455685947045

POST 方式提交

参数说明
- stm=1455685947045

请求头
- Accept:*/*
- Accept-Encoding:gzip, deflate
- Accept-Language:en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,es;q=0.2,eo;q=0.2
- Cache-Control:no-cache
- Connection:keep-alive
- Content-Length:344
- Cookie:grwng_uid=45f5d7f4-8807-4fce-ad48-9e0569625d03; AWSELB=258D9D590E00B3DE939BD2301A2166BB8314D5BFDD05B09D369CB4B9F5AF49FC1DC2C79C9542C10B2E4408F9DA5839AFC9C332129429B8C461637A300314921B4742BA164E418FE800DB7486F3D74FA17E6435D209
- Host:api.growingio.com
- Origin:http://tingge.github.io
- Pragma:no-cache
- Referer:http://tingge.github.io/react/
- User-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36

响应头
- Access-Control-Allow-Credentials:true
- Access-Control-Allow-Headers:x-requested-with,content-type,Cache-Control,Pragma,Date,x-timestamp
- Access-Control-Allow-Methods:POST, GET, OPTIONS, PUT, DELETE
- Access-Control-Allow-Origin:http://tingge.github.io
- Access-Control-Expose-Headers:WWW-Authenticate, Server-Authorization
- Connection:keep-alive
- Content-Length:15
- Content-Type:application/json; charset=utf-8
- Date:Wed, 17 Feb 2016 05:12:27 GMT
- P3P:policyref="/w3c/p3p.xml", CP="NOI DSP PSAa OUR BUS IND ONL UNI COM NAV INT LOC"
- Server:nginx

Request Payload

    6ðD``\`fÀ(
     vrà1,Ja¤¹³æ	Qn`Inq:Lu9GÀ:q\ûá$\¿:8Ó^¥&	q$ØÀ¾MHÐ4Àê§î 3:	/ï¯Ë eBEbCidDOÂG®¦N çÍÁéÎg
    Cï¢KÁàg¯ÏÃPäRBLÖgÎ`h2(5W$%n çÀ@ãK¶gÆáÎ¯¢©¥£§ dbncohìêîã]ëïèG
    E¢V8$@¤Òy
    !2 ·@- Ð+hD¤ ÜH²-Ò¨À'`íÃ'ÄX@FB¬ªW*U\Z_®K,¸=xHb3#¦³ µa°mÄ»}À¤

响应内容

	{"status":"ok"}

#### https://api.growingio.com/touch

GET 方式提交

请求头
- Accept:image/webp,image/*,*/*;q=0.8
- Accept-Encoding:gzip, deflate, sdch
- Accept-Language:en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,es;q=0.2,eo;q=0.2
- Cache-Control:no-cache
- Connection:keep-alive
- Cookie:grwng_uid=45f5d7f4-8807-4fce-ad48-9e0569625d03; AWSELB=258D9D590E00B3DE939BD2301A2166BB8314D5BFDD05B09D369CB4B9F5AF49FC1DC2C79C9542C10B2E4408F9DA5839AFC9C332129429B8C461637A300314921B4742BA164E418FE800DB7486F3D74FA17E6435D209
- Host:api.growingio.com
- Pragma:no-cache
- Referer:http://tingge.github.io/react/
- User-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36

响应头
- Access-Control-Allow-Credentials:true
- Access-Control-Allow-Headers:x-requested-with,content-type,Cache-Control,Pragma,Date,x-timestamp
- Access-Control-Allow-Methods:POST, GET, OPTIONS, PUT, DELETE
- Access-Control-Allow-Origin:
- Access-Control-Expose-Headers:WWW-Authenticate, Server-Authorization
- Connection:keep-alive
- Content-Length:0
- Date:Wed, 17 Feb 2016 05:12:27 GMT
- P3P:policyref="/w3c/p3p.xml", CP="NOI DSP PSAa OUR BUS IND ONL UNI COM NAV INT LOC"
- Server:nginx

响应内容
- 无

响应状态码
- 204

#### https://api.growingio.com/events?stm=1455685948059

POST 方式提交

参数说明
- stm=1455685948059

请求头
- Accept:*/*
- Accept-Encoding:gzip, deflate
- Accept-Language:en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,es;q=0.2,eo;q=0.2
- Cache-Control:no-cache
- Connection:keep-alive
- Content-Length:500
- Cookie:grwng_uid=45f5d7f4-8807-4fce-ad48-9e0569625d03; AWSELB=258D9D590E00B3DE939BD2301A2166BB8314D5BFDD05B09D369CB4B9F5AF49FC1DC2C79C9542C10B2E4408F9DA5839AFC9C332129429B8C461637A300314921B4742BA164E418FE800DB7486F3D74FA17E6435D209
- Host:api.growingio.com
- Origin:http://tingge.github.io
- Pragma:no-cache
- Referer:http://tingge.github.io/react/
- User-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36

响应头
- Access-Control-Allow-Credentials:true
- Access-Control-Allow-Headers:x-requested-with,content-type,Cache-Control,Pragma,Date,x-timestamp
- Access-Control-Allow-Methods:POST, GET, OPTIONS, PUT, DELETE
- Access-Control-Allow-Origin:http://tingge.github.io
- Access-Control-Expose-Headers:WWW-Authenticate, Server-Authorization
- Connection:keep-alive
- Content-Length:15
- Content-Type:application/json; charset=utf-8
- Date:Wed, 17 Feb 2016 05:12:28 GMT
- P3P:policyref="/w3c/p3p.xml", CP="NOI DSP PSAa OUR BUS IND ONL UNI COM NAV INT LOC"
- Server:nginx

Request Payload

    6ðD
    æÆÀÀl`+8@8
    g0ÂpÀx¯@&hVìá}`Ñã4Tâ ÆCË( v,QÁB¤sÐB,I,Ør½aÌY¥ÅÀ6zQ'7/4*
    QvIk;;sT:T»kL»{+Xz'e$[QP0IJö;7bkeCv}¶ÑúLÁá±¶Ê¼úJ±eM«É%:jc
    L+1cÀ.O@hù0_apªîþ¹ñ¤Úk2ü.¯D5)jÊJSmU6vJ²´ÍXÇ2 Ú¡%ÙØ_z;ÓéÑø
    AÅ°/ìÈý¡`Ø|1£Ñìhk'b%jÜ¥|´ö½7¨É²flðRÓ©åÔù(´F+1ÆÀRÊ²©ÙÇ@
    ^ ÐßR±*`UWÌ	
    ù2õ¬à?U5ÃHÓP¢Ô2µê$1Ðhø [ú©00}^ÕuÑÅkL"bRX$+%¬$ÚÉÌ¦K¦2%e7M)¼>jï°Ý¬mêñÞk}¹Þîö{o.«ßt

响应内容

	{"status":"ok"}

#### https://api.growingio.com/events?stm=1455685950762

POST 方式提交

参数说明
- stm=1455685950762

请求头
- Accept:*/*
- Accept-Encoding:gzip, deflate
- Accept-Language:en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,es;q=0.2,eo;q=0.2
- Cache-Control:no-cache
- Connection:keep-alive
- Content-Length:5240
- Cookie:grwng_uid=45f5d7f4-8807-4fce-ad48-9e0569625d03; AWSELB=258D9D590E00B3DE939BD2301A2166BB8314D5BFDD05B09D369CB4B9F5AF49FC1DC2C79C9542C10B2E4408F9DA5839AFC9C332129429B8C461637A300314921B4742BA164E418FE800DB7486F3D74FA17E6435D209
- Host:api.growingio.com
- Origin:http://tingge.github.io
- Pragma:no-cache
- Referer:http://tingge.github.io/react/
- User-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36

响应头
- Access-Control-Allow-Credentials:true
- Access-Control-Allow-Headers:x-requested-with,content-type,Cache-Control,Pragma,Date,x-timestamp
- Access-Control-Allow-Methods:POST, GET, OPTIONS, PUT, DELETE
- Access-Control-Allow-Origin:http://tingge.github.io
- Access-Control-Expose-Headers:WWW-Authenticate, Server-Authorization
- Connection:keep-alive
- Content-Length:15
- Content-Type:application/json; charset=utf-8
- Date:Wed, 17 Feb 2016 05:12:31 GMT
- P3P:policyref="/w3c/p3p.xml", CP="NOI DSP PSAa OUR BUS IND ONL UNI COM NAV INT LOC"
- Server:nginx

Request Payload

    6ðD
    æÆÀÀl`+8@8
    g0ÂpÀx¯@&hVìá}`Ñã4Tâ ÆCË( v,QÁB¤sÐB,I,Ør½aÌY¥ÅÀQ'7/4*
    QvIk;;s4:4»k,»{+Xz'e$[QP0I*ö;7bkeCv}Rö±ú,¡ñÉöî¾¹áQ±å:å±!±,¤RësªÒ*»*Ý±'e«^¤w1*ÉÒµãVP¹Dvv'Z@û	ÀP°Ðn´Ù,fkÊg´ÄmÆÛz² í¶:Îk5ÎàòyTÄe
    Îâóx}$
    +*tº=¼ßÌEhP¯´&ìýQÄæp¹]n÷G³ÑÏ¦½Þ¢O¬DÃÑ¹!+è¢±èj1m-ZJ	;baÌ¬§RµtS%ofÁbQ8*Ý	´ªX£Zãòïi5QHÔÓµôÝhmlQ¢ô%·G"ÓSTË¬QmgÜúª­¤êCúÒØÖbjk1½oçÖ-§lµÜ±f½w×Ü/ó¸âîÜ)]7·oMu¶ßÚ»äÀ´YÀ|@â?äâNslÿ-ø²°øÂ2º¼ì?àK(½2 5yò¶¢oj6â½îní£ï²î/¾àYak8ÊQ ·A@nx:¢ªëE¶Xdú±~¾hz«(h¨'QçDÉ\Å*^kØqªIa¦A1&%ºd(îé1Dã±Ê{ä{Y_¤m<åQH²ï§6úl+É,@T¤Y*Gæ¥ql@vHçE:\SEyT{Þ©io¡ìY6d9N³¶çzuYå%FJRg>STÝlPÚU×¿\Ê#YøgíÅ ¾G¤]þ½ @L{(ÉÏø<(#Pÿ[M	¯^ç®UG¶z~BÔ­kUøV#C=U3='TÍ	\×õ
    `6ªf\µêWåÈÐ
    3Õ£ýoÞ»ý?UãcjÕeE`8£ñu1ÓXÀ0©LãRÏe¡FÞóÿ1äÓ­°¿N¸ï¡.![7ÀrôÐ¬ýò³çèÙ­eÚñ1´uÓæLS&Å^Ñ5Vío-ì]¹6»|Ç°-{Þ]ãí«Æ²ën¾ËÐE$Yv!vÝ±=ÆçÕN+æÃo
    ¾ð?ï¹hèÀ4$$$ì	à}qvÓuM»»®lfßË!çxeØÔ{ÝWÍ@ó_\B·í÷ÒÞï=ûABó£¬¶MîÇvmw*Ï¼ô»®àh%|o´Rº\G»ön-÷Îµ®Û¯qé|·µö"×øÇyæµóÚIynäµ+÷7ómv@É "A#°HÂRl"p£¸$ ç&@EöAW+g¼0}ôâÇÒ@8p'Eâ& ,ýf
    ªè/ùÀÖh=G0òÐE í½Ã®*3¨¥ë(6FÌèÎ£dq{ÅK@!Oò¶0º=xywáÆ0Fábà¥ò3ÛøÃ`K¶f,s®£c¢hu?Ëñ¥d¢nQY'øä¥çb$N PsÚÚÃþM¤à?à
    PZÀuw
    LMA7ÙE¼ã`2°5¤
    vÚ!ñ =T
    VN?¤À&k0fdÍgÎfZÈ$¢á«19v(§¸sm¿r>mB0ú¥£OWØ¥ðü°DÊX¬õ
    ÞvKc2[ì:´ñ0.`WãINEÎ<¤8Zr6`ÒÙ·ÀEìÀë­Fp:-=X'¦Â8-	çÂUJ.t
    )$¯g$ÌÒ¨T @<DÕÒ)¡|<Ðâ ü¥
    ÷+vj-¹(åB}QJQªEêÔUÅàrÍð´dÚÔ¼¡jC­579×¢£=P/¾h£wÊü"l]C^/
    Ü4ðZ£\zj©+Q	X)5×.8 äÚ$½Í<¶|ãÿ#wübÐ±ùn£.YÖ#þ#+j©Õ=¥#þ&[@ÔÔ´f:­l;(àA&"$3s³øï2ÜKýel~$ðP*P®Ù¢ôXT5M×«ÕRzýEjù½Åü«Ø{ôZË¼õB¬@ä½³.6zÔ*vi#öë£¤ðköR»ÜkOîmSiNð)qÛ|©¨H
    <ùF@¯CÔÿÅð#a«Î¤?zinMEÉ(
    «')	áÀØ~·
    ²4Û!^m¦)2ZVl}9­~WÑaäâ-úeM>ÜÜlfÓDvÔûWPÀS`A`Wìà­aµYÃ>kÑF-ö|Íé ·ûTþK&~m5	£Ðb\ÜôIô´rtÒJB¹×`×W.2u ¡[¡¸G ¼(/Ô^s¸}.É3Q×Fê¨£dpg»`«"tÅë4f6¦md?ðû¹¾º¾¹6tð¢iu¹µ;gÙ7ëke/Ù½·Wâ 
    °QU¸ço`ÛKwÎ¯Î®ÔØ¶e¬÷Ø'{ïÅ[´aÐ ®èçG¤ô²/Ý»cm
    ×4¡F«Á=j££ÞW×(¿yÑyO
    ¼öÆÅÇI`.Ü2é=Ö,Ò9\~ö¿²:kOn4Ë=²ÎþÎý(î,ÙU°9=gÇ²ÏºuÏu«ßÛö´°.9Óª­Z)lKÔ¸×ú¾Á@Ê<zÎ×Ný¿ðÔq¬q0±
     5
    û_ìØx6Pb"NKª-»ÁGáÔ
    #ñ÷©WRð\Ð²Mc÷¸¾ô§¯@¨6[î>Såwuí/×P®Îòbô®Ù}Wzö6óaì`*æmgÎrÞ1HÛµíÉSÄóÉ8×è}}ðÞÚ¾o_·4MÚ 2@xl¿ñVÒ@nê/]óî¡qçà½%bèÔ*#õùûmÛÇïÚ>øù}üoÐò_ëÒ8={7)ç¢hó3û»97yµxxù×ùÏø/¬Ü`;zò"©zy{y¼¹õ®Ï¾}´yèQ9 Gù Am=ù_¥ÐÔ?à?ã(¹4³)C®s=4ëä5Óþ"B@_9);K³Xñ,2c¢l
    A¯Zk¹ò¿±0l¶{Ó¥ëí¶ÿ²cxÐZy½H3@Pz¼B) nX|øÀu$¢iPõ§à@PsÆ«hQ(DPxE³¤EÍØSTF°n°(¨y¹à+KðX8´£(|0
    qG¤e¸up§I
    @]>@N
    CÒ$àÔ-ÀÜùõ·wDFD¤YÙ¾ÙW0O _ÍÊØa°LXGhÄ4fF,Phó¦»¬BFlREiÛº(9¯ÇÔoXnÄ½¬DÜt³,jFmÇÌ}Ä|hâ²à!¼#22´;jF¤AL:½Å|[ÄüsÃ$À {ä=ÂbPxQ.(Ì]ÙÌJ&4CÆL_XFÄIÇlxÇWàX #ÈRr'èKn³¸}RQÇRd»|i$íÇ~%²Xìp¤Äf)KÇS¥ÒY+í¯$0Q%l]Å
    p:6ÑûU¸ooÓÝ%àÂÊB:é»û²{Å¢AË75cC°t>ØÖ&Ìz¦
    d¤LPðQ'¥òw¤ÒF¥ú}&çX¶xfªb8úI'hÙr~Äwføfo¦*Nzë- gVÚ£e¤zqe}ûÒ¦¸f~)f@¥&ngÇXºUÌÃþáLBÃ5GêY\¤ÚB¥G 0Ãï¿ÀÎA¹õ§èèHe6m¦¢Dd~Ù.pÄ®NºÒdåæhâÿðna&6^åKfËñ¦o#W¥ªvg6AådØpFk£çsæ®Dæaçæf.Uf{Ç7åO{ëà¼çpwiðiÃ8¦[Ñ|$:Cþç´JdAXåè@¤ÑTT°#hE%çZYMg¾F1túw~Ø±Sæ^O¹ñaÞP?ÈwþXg÷(1ñiZæjFç@ùõ¼Æ[iyAdúò!fq&v&fZH'J*þ+Ô${pTë/³(iU§­a$8(Ô&:xU1Y2X¯Ó¤¨Ý²åþUäæ[åI~P,C%|UÈJÀ}çE
    TîZWBVrIVÆtÅfG_zV5UlÅiV±@T¾mÞBçjà,³KÂ^qCA2Aà5Êä?âd&ÆV¥bw²IÊ!=B0T×(	ÖÖ+¨YPÕy¸Ø
    Ô)]×þsTOx¾»V½Q
    G×VKUW±WÕ@5YP7¥kæW\hCCg½L7
    fVµSÇ&×åA÷²5ãG&üd@
    	»°æi¦Í[Ñ
    ¡^0!65}Ö}_¸µ 5`="ñ2,1]sO 5u^Ôõq$³ÕT4KIøÁtµ,Y¢#hËj7CETeyL«Q5ÚnH-µ³p7W×¡¶7µF·¦·uN¶/¬WÛr[ý¤·;mQû(!¦0$[81´GùHA¯¹¶uG¶+~Ô®ÈxA©ÀPSj=Ë|wPNVÅ~vkBµ]ÃAPÂmyt;ew$f5~µa·®Iwå3%Õb6wqulµCtuwtR7{·óµæcWà*A×
    A *r®twE·£C×Èz+XÁü
    ­X<Gat·\5eaÊXôhýVÕAtÏFU__{¸aQßktØEH-õov·ãn·$÷9+ôWEögõÜw¿l6qUjrÂá7¡o´·i|A­X8t!
    aÀÎÕ£H}§¢¯ +Â	A0ËN(yö Æ6T+=w
    ¿LïUT«]~VÕôðèÛcöÿy`(ò
    cHµt7Lî\Å^OHsbT¶G	p[ÐM`y[½\;K(Ó¶Òu½r7B8<ÖvYõ¨ªp¼_
    hÀDæMÿSÄ÷{oDXR(äLÈÙu´y· *L ÞM[c×íµmNOèìÁ6ÅMNôMÈË¶ëIFû	8,1ÁÂR]
    ô~Ý
    Cv¸àÍ;zOÐÔ(ôIÒN&©2BC(ÖmMÒ¶dù'µVÏ4ü§Ôü¢ ØuÄãaÎÏòµì{u\ÂLòK1NÅuÎP{7äÅLE'Î$e¶ìÖDóÍk-mÁiÔÂS¡XîÐ¯~Blø.ïWàÔÁ2;ôWDBB22A TãOäðÎÎ'^ÎnU/bØöÕhRÔOÏÎ%[u,9.äËMÜý-eÙ&»V
    öÏ
    ÷/2ãÄèÖÕJÑÏH®â­2ïVëF¤5÷j#þ«al%¡ÀÏ`¡;Lô)B2;,jß~@Û¹Âc®Û·E%
    ×/Ï-=húô­úÈ.rQç`Ùã®ôòôm¤ÂuKloeoø&éLÊÿ­Êã±Tóò¯±l®jûWæÍÍ5Qm´èàr«¯X4þ/à4º÷Mwâ¤á¹m¸@ÄÌm4z(ôv´/AT'Htr×¡>
    ôò3õmÕÌÒm{ZìöølIÁî&Õwß^·Æë²ÎÛ×ÎÎíÿuV`}uB®Ô§ÊþhïnåõhÖìfèmÒÖFt´£(&C­HbÃÓÓFë`Ó®ÀëÆÀ" &à!P
    Ðèpð3À4È<(
    ¨h è	)-À1¸;xDADç(@q÷ø,BPA$,&d@Ñ@9CB:U´4´VíBïôEãfÏlTéêIiÐr>îéÑ&Ê¬3>ÀÊ¾õG-µy(9ám9áéìèÀ»9×Ô	ªÐÏùÄ-Õ'\XþÚÍ.fò"EÃNóÜÍyù¸]_ÇyOYo|ÇuA×i_N1^kOåð.*6]´ÝfUøô.I%ùnÕ_Üµõ]mL^rãÅÚ]ÙÎ4£U¹ÈÝú]m[µÕöô#_{N5å×ÏÕý£-Ú®@ß\õóÂÜÖÜQ6ÕúÞ-ê\ÍØÝæ\±Ü|d®íìÝæÓß]ìa^äÐ

响应内容

	{"status":"ok"}

### 点击

#### https://api.growingio.com/events?stm=1455685948059

POST 方式提交

参数说明
- stm=1455685948059

请求头
- Accept:*/*
- Accept-Encoding:gzip, deflate
- Accept-Language:en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,es;q=0.2,eo;q=0.2
- Cache-Control:no-cache
- Connection:keep-alive
- Content-Length:356
- Cookie:grwng_uid=45f5d7f4-8807-4fce-ad48-9e0569625d03; AWSELB=258D9D590E00B3DE939BD2301A2166BB8314D5BFDD05B09D369CB4B9F5AF49FC1DC2C79C9542C10B2E4408F9DA5839AFC9C332129429B8C461637A300314921B4742BA164E418FE800DB7486F3D74FA17E6435D209
- Host:api.growingio.com
- Origin:http://tingge.github.io
- Pragma:no-cache
- Referer:http://tingge.github.io/react/
- User-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36

响应头
- Access-Control-Allow-Credentials:true
- Access-Control-Allow-Headers:x-requested-with,content-type,Cache-Control,Pragma,Date,x-timestamp
- Access-Control-Allow-Methods:POST, GET, OPTIONS, PUT, DELETE
- Access-Control-Allow-Origin:http://tingge.github.io
- Access-Control-Expose-Headers:WWW-Authenticate, Server-Authorization
- Connection:keep-alive
- Content-Length:15
- Content-Type:application/json; charset=utf-8
- Date:Wed, 17 Feb 2016 05:50:20 GMT
- P3P:policyref="/w3c/p3p.xml", CP="NOI DSP PSAa OUR BUS IND ONL UNI COM NAV INT LOC"
- Server:nginx

Request Payload

    6ðD``\`fÀ(
     vrà1,Ja¤¹³æ	Qn`Inq:Lu9GÀ:q\ûá$\¿:8Ó^¥&	q$ØÀ¾MHÐ4Àê§î 3
    ð¡Õ¬,$E¢K%dC©§AKÌ+"@Á çÍÁíÉgIËåÁàg¯ÏÏPâRBFÖgÉ`b2"5	×$%n çÀ@ãO	¶gÆáÎ¯¢©¨¯¨ljfekohìêîï]ëïë¦ÓBáH%£$)4¾ PÙðâÓYHtÑÊÍ¶Ì@
    B
    À(
    Ó)xfîÜ²|e*ÁJtr¥Z«PAq|¦S&²ãõàQ¸Òn-â¶Þ'°9¸fdlLpé

响应内容

	{"status":"ok"}

## 附录

### 域名服务器
| 域名 | 作用 |
|--------|--------|
|   dn-growing.qbox.me    |  CDN，静态脚本      |
|   api.growingio.com     |  采集Server	|

### 关于 Request Payload

Todo: 暂未分析 events 包的 Request Payload 内容。
