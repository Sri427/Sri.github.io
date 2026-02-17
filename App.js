// App.js
import "react-native-gesture-handler";
import React, { useMemo, useState } from "react";
import {
 View,
 Text,
 StyleSheet,
 ScrollView,
 SafeAreaView,
 TouchableOpacity,
 Switch,
 Alert,
 Dimensions,
 Platform,
} from "react-native";


import { GestureHandlerRootView } from "react-native-gesture-handler";
import Slider from "@react-native-community/slider";
import Svg, { Path } from "react-native-svg";


import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import {
 Home as HomeIcon,
 BarChart2,
 TrendingUp,
 Sparkles,
 Smartphone,
 Shield,
 Clock,
 Target,
 Activity,
 Zap,
 Bluetooth,
 RotateCcw,
 Lock,
 User,
} from "lucide-react-native";


const Tab = createBottomTabNavigator();
const { width: SCREEN_W } = Dimensions.get("window");
const IS_SMALL = SCREEN_W < 375;


const COLORS = {
 bg: "#0B1220",
 card: "#FFFFFF",
 cardSoft: "#F7F9FD",
 border: "#E7EDF5",
 text: "#0B0F14",
 muted: "#64748B",
 muted2: "#7E8CA3",
 accent: "#3DF2FF",
 accentSoft: "rgba(61, 242, 255, 0.14)",
 orange: "#F0A500",
 shadow: "rgba(0, 0, 0, 0.28)",
};


function ScreenWrap({ children }) {
 return (
   <SafeAreaView style={styles.safe}>
     <ScrollView
       style={styles.scroll}
       contentContainerStyle={styles.scrollContent}
       showsVerticalScrollIndicator={false}
     >
       {/* Center everything inside the page width */}
       <View style={styles.pageCenter}>{children}</View>
     </ScrollView>
   </SafeAreaView>
 );
}


function SectionTitle({ title, subtitle }) {
 return (
   <View style={styles.sectionTitleWrap}>
     <Text style={styles.h1} numberOfLines={1}>
       {title}
     </Text>
     <Text style={styles.h2} numberOfLines={2}>
       {subtitle}
     </Text>
   </View>
 );
}


/** Simple fake ring (no SVG) */
function ScoreRing({ score = 66 }) {
 const p = Math.max(0, Math.min(100, score)) / 100;


 const ringSize = Math.min(300, SCREEN_W - 92);
 const ringBorder = Math.max(16, Math.round(ringSize * 0.07));
 const radius = ringSize / 2;


 const arcStyle = useMemo(() => {
   const greySides = p < 0.65 ? 2 : p < 0.85 ? 1 : 0;
   const topGrey = greySides >= 1;
   const leftGrey = greySides >= 2;


   return {
     borderTopColor: topGrey ? "rgba(255,255,255,0.14)" : COLORS.orange,
     borderLeftColor: leftGrey ? "rgba(255,255,255,0.14)" : COLORS.orange,
     transform: [{ rotate: "-140deg" }],
   };
 }, [p]);


 return (
   <View style={{ width: ringSize + 20, height: ringSize + 20, alignItems: "center", justifyContent: "center" }}>
     <View
       style={{
         position: "absolute",
         width: ringSize,
         height: ringSize,
         borderRadius: radius,
         borderWidth: ringBorder,
         borderColor: "rgba(255,255,255,0.14)",
       }}
     />
     <View
       style={[
         {
           position: "absolute",
           width: ringSize,
           height: ringSize,
           borderRadius: radius,
           borderWidth: ringBorder,
           borderColor: COLORS.orange,
           borderLeftColor: "rgba(255,255,255,0.14)",
           borderTopColor: "rgba(255,255,255,0.14)",
         },
         arcStyle,
       ]}
     />
     <View style={{ alignItems: "center", justifyContent: "center" }}>
       <Text style={[styles.ringScore, { fontSize: Math.max(64, Math.round(ringSize * 0.28)) }]}>{score}</Text>
       <Text style={styles.ringLabel}>ALIGNMENT</Text>
     </View>
   </View>
 );
}


function StatCard({ icon, value, label }) {
 return (
   <View style={styles.smallCard}>
     <View style={styles.smallCardIcon}>{icon}</View>
     <Text style={styles.smallCardValue} numberOfLines={1}>
       {value}
     </Text>
     <Text style={styles.smallCardLabel} numberOfLines={1}>
       {label}
     </Text>
   </View>
 );
}


function Pill({ icon, text }) {
 return (
   <View style={styles.pill}>
     {icon}
     <Text style={styles.pillText}>{text}</Text>
   </View>
 );
}


function Tag({ text, variant = "accent" }) {
 const bg = variant === "accent" ? COLORS.accentSoft : "#FFF2C7";
 const border = variant === "accent" ? "rgba(61,242,255,0.35)" : "#FFD57B";
 const color = variant === "accent" ? "#0B1220" : "#B85D00";


 return (
   <View style={[styles.tag, { backgroundColor: bg, borderColor: border }]}>
     <Text style={[styles.tagText, { color }]} numberOfLines={1}>
       {text}
     </Text>
   </View>
 );
}


/* -------------------- HOME -------------------- */
function HomeScreen() {
 return (
   <ScreenWrap>
     <SectionTitle title="Straight UP!" subtitle="Your posture companion" />


     <View style={styles.centerBlock}>
       <ScoreRing score={66} />
     </View>


     <TouchableOpacity
       activeOpacity={0.9}
       style={styles.alertBtn}
       onPress={() => Alert.alert("Slouching Detected", "This is where you’d open a quick fix / action panel.")}
     >
       <View style={styles.alertIconWrap}>
         <View style={styles.alertTriangle} />
       </View>
       <Text style={styles.alertText} numberOfLines={1}>
         Slouching Detected
       </Text>
     </TouchableOpacity>


     <View style={styles.row2}>
       <StatCard icon={<Activity size={22} color={COLORS.muted2} />} value="0m" label="Session time" />
       <StatCard icon={<TrendingUp size={22} color={COLORS.muted2} />} value="7" label="Day streak" />
     </View>


     <View style={{ height: 28 }} />
   </ScreenWrap>
 );
}


/* -------------------- SESSIONS -------------------- */
function SessionsScreen() {
 const sessions = [
   { day: "Jan 17", neutral: 28, slouch: 22 },
   { day: "Jan 18", neutral: 16, slouch: 12 },
   { day: "Jan 19", neutral: 33, slouch: 20 },
   { day: "Jan 20", neutral: 31, slouch: 23 },
   { day: "Jan 21", neutral: 48, slouch: 15 },
   { day: "Jan 23", neutral: 15, slouch: 11 },
 ];


 const maxTotal = Math.max(...sessions.map((s) => s.neutral + s.slouch), 60);
 const chartH = IS_SMALL ? 170 : 190;


 return (
   <ScreenWrap>
     <SectionTitle title="Sessions" subtitle="Your posture history" />


     <View style={styles.bigCard}>
       <Text style={styles.cardTitle} numberOfLines={1}>
         Latest Session
       </Text>
       <Text style={styles.cardSub} numberOfLines={1}>
         Friday, January 23
       </Text>


       <View style={styles.latestStatsRow}>
         <View style={styles.latestStat}>
           <View style={styles.iconBadge}>
             <Clock size={18} color={COLORS.muted2} />
           </View>
           <View style={styles.centerTextBlock}>
             <Text style={styles.latestValue} numberOfLines={1}>
               73m
             </Text>
             <Text style={styles.latestLabel} numberOfLines={1}>
               Duration
             </Text>
           </View>
         </View>


         <View style={styles.latestStat}>
           <View style={styles.iconBadge}>
             <Target size={18} color={COLORS.muted2} />
           </View>
           <View style={styles.centerTextBlock}>
             <Text style={styles.latestValue} numberOfLines={1}>
               68
             </Text>
             <Text style={styles.latestLabel} numberOfLines={1}>
               Avg. Score
             </Text>
           </View>
         </View>
       </View>


       <View style={styles.centerRow}>
         <View style={styles.legendRow}>
           <View style={styles.legendItem}>
             <View style={[styles.dot, { backgroundColor: COLORS.accent }]} />
             <Text style={styles.legendText} numberOfLines={1}>
               Neutral
             </Text>
           </View>
           <View style={styles.legendItem}>
             <View style={[styles.dot, { backgroundColor: COLORS.orange }]} />
             <Text style={styles.legendText} numberOfLines={1}>
               Slouch
             </Text>
           </View>
           <Tag text="Minutes" variant="accent" />
         </View>
       </View>
     </View>


     <View style={styles.bigCard}>
       <View style={styles.cardTopRow}>
         <Text style={styles.cardTitle} numberOfLines={1}>
           Last 7 Sessions
         </Text>
         <Tag text="Stacked total" variant="accent" />
       </View>


       <Text style={styles.helperText} numberOfLines={2}>
         Each bar shows total minutes. Blue = neutral, orange = slouch.
       </Text>


       <View style={styles.centerBlock}>
         <View style={[styles.stackChartWrap, { height: chartH + 34, width: "100%" }]}>
           {/* GRID: horizontal + vertical */}
           <View style={[styles.stackGrid, { height: chartH }]}>
             {[0.25, 0.5, 0.75].map((t) => (
               <View key={`h-${t}`} style={[styles.gridH, { top: chartH * t }]} />
             ))}
             {sessions.map((_, i) => (
               <View
                 key={`v-${i}`}
                 style={[
                   styles.gridV,
                   {
                     left: (i + 0.5) * (100 / sessions.length) + "%",
                   },
                 ]}
               />
             ))}
           </View>


           <View style={styles.stackChartRow}>
             {sessions.map((s) => {
               const total = s.neutral + s.slouch;
               const totalH = (total / maxTotal) * chartH;
               const neutralH = (s.neutral / total) * totalH;
               const slouchH = (s.slouch / total) * totalH;


               return (
                 <View key={s.day} style={styles.stackGroup}>
                   <Text style={styles.stackTop} numberOfLines={1}>
                     {total}m
                   </Text>


                   <View style={[styles.stackTrack, { height: chartH }]}>
                     <View style={{ flex: 1, justifyContent: "flex-end" }}>
                       <View
                         style={{
                           height: slouchH,
                           backgroundColor: COLORS.orange,
                           borderBottomLeftRadius: 10,
                           borderBottomRightRadius: 10,
                         }}
                       />
                       <View
                         style={{
                           height: neutralH,
                           backgroundColor: COLORS.accent,
                           borderTopLeftRadius: 10,
                           borderTopRightRadius: 10,
                         }}
                       />
                     </View>
                   </View>


                   <Text style={styles.stackLabel} numberOfLines={1}>
                     {s.day}
                   </Text>
                 </View>
               );
             })}
           </View>
         </View>
       </View>
     </View>


     <View style={{ height: 28 }} />
   </ScreenWrap>
 );
}


/* -------------------- TRENDS -------------------- */
function catmullRomToBezier(points) {
 if (points.length < 2) return "";
 const d = (a, b) => ({ x: b.x - a.x, y: b.y - a.y });
 const scale = (v, s) => ({ x: v.x * s, y: v.y * s });
 const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });


 let path = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
 for (let i = 0; i < points.length - 1; i++) {
   const p0 = points[i - 1] || points[i];
   const p1 = points[i];
   const p2 = points[i + 1];
   const p3 = points[i + 2] || p2;
   const v1 = d(p0, p2);
   const v2 = d(p1, p3);
   const c1 = add(p1, scale(v1, 1 / 6));
   const c2 = add(p2, scale(v2, -1 / 6));
   path += ` C ${c1.x.toFixed(2)} ${c1.y.toFixed(2)}, ${c2.x.toFixed(2)} ${c2.y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
 }
 return path;
}


function TrendsScreen() {
 const [mode, setMode] = useState("daily");


 const dailyPoints = [86, 90, 84, 83, 85, 86, 87, 84, 80, 81, 83, 79, 82, 81, 77, 78, 76, 77, 74, 73, 72, 74];
 const weeklyPoints = [88, 84, 82, 79, 77, 75, 74];
 const points = mode === "daily" ? dailyPoints : weeklyPoints;


 const chartH = IS_SMALL ? 180 : 200;
 const chartW = Math.min(310, SCREEN_W - 108);


 const coords = points.map((v, i) => {
   const x = (i / (points.length - 1)) * chartW;
   const y = chartH - (v / 100) * chartH;
   return { x, y };
 });


 const curvePath = catmullRomToBezier(coords);


 const yTicks = [100, 75, 50, 25, 0];
 const xLabelsDaily = IS_SMALL ? ["Dec 28", "Jan 5", "Jan 13", "Jan 23"] : ["Dec 28", "Jan 1", "Jan 5", "Jan 9", "Jan 13", "Jan 18", "Jan 23"];
 const xLabelsWeekly = IS_SMALL ? ["W1", "W3", "W5", "W7"] : ["W1", "W2", "W3", "W4", "W5", "W6", "W7"];
 const xLabels = mode === "daily" ? xLabelsDaily : xLabelsWeekly;


 return (
   <ScreenWrap>
     <SectionTitle title="Trends" subtitle="Track your progress" />


     <View style={styles.stats3Row}>
       <View style={styles.stats3Card}>
         <TrendingUp size={20} color={COLORS.accent} />
         <Text style={styles.stats3Value} numberOfLines={1}>
           7
         </Text>
         <Text style={styles.stats3Label} numberOfLines={1}>
           Day Streak
         </Text>
       </View>
       <View style={styles.stats3Card}>
         <Target size={20} color={COLORS.orange} />
         <Text style={styles.stats3Value} numberOfLines={1}>
           14
         </Text>
         <Text style={styles.stats3Label} numberOfLines={1}>
           Best Streak
         </Text>
       </View>
       <View style={styles.stats3Card}>
         <Clock size={20} color={COLORS.accent} />
         <Text style={styles.stats3Value} numberOfLines={1}>
           30
         </Text>
         <Text style={styles.stats3Label} numberOfLines={1}>
           Sessions
         </Text>
       </View>
     </View>


     <View style={styles.avgCard}>
       <View style={styles.centerTextBlock}>
         <Text style={styles.avgSmall} numberOfLines={1}>
           30-Day Average
         </Text>
         <Text style={styles.avgBig} numberOfLines={1}>
           80
         </Text>
       </View>
       <View style={styles.avgIconCircle}>
         <TrendingUp size={26} color={COLORS.accent} />
       </View>
     </View>


     <View style={styles.bigCard}>
       <Text style={styles.cardTitle} numberOfLines={1}>
         Posture Trends
       </Text>


       <View style={styles.segmentWrap}>
         <TouchableOpacity
           activeOpacity={0.85}
           onPress={() => setMode("daily")}
           style={[styles.segment, mode === "daily" && styles.segmentActive]}
         >
           <Text style={[styles.segmentText, mode === "daily" && styles.segmentActiveText]} numberOfLines={1}>
             Daily
           </Text>
         </TouchableOpacity>


         <TouchableOpacity
           activeOpacity={0.85}
           onPress={() => setMode("weekly")}
           style={[styles.segment, mode === "weekly" && styles.segmentActive]}
         >
           <Text style={[styles.segmentText, mode === "weekly" && styles.segmentActiveText]} numberOfLines={1}>
             Weekly
           </Text>
         </TouchableOpacity>
       </View>


       <View style={styles.centerBlock}>
         <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
           {/* Y axis labels */}
           <View style={{ width: 34, height: chartH, justifyContent: "space-between", paddingVertical: 2 }}>
             {yTicks.map((v) => (
               <Text key={v} style={styles.yLabelLine} numberOfLines={1}>
                 {v}
               </Text>
             ))}
           </View>


           {/* Chart */}
           <View style={{ paddingLeft: 10, alignItems: "center" }}>
             <View style={[styles.chartCard, { width: chartW + 16, alignSelf: "center" }]}>
               <Svg width={chartW} height={chartH}>
                 {/* horizontal grid */}
                 {[0.25, 0.5, 0.75].map((t) => (
                   <Path
                     key={`h-${t}`}
                     d={`M 0 ${(chartH * t).toFixed(2)} L ${chartW.toFixed(2)} ${(chartH * t).toFixed(2)}`}
                     stroke={"rgba(11,18,32,0.10)"}
                     strokeWidth={1}
                   />
                 ))}
                 {/* vertical grid */}
                 {[0.2, 0.4, 0.6, 0.8].map((t) => (
                   <Path
                     key={`v-${t}`}
                     d={`M ${(chartW * t).toFixed(2)} 0 L ${(chartW * t).toFixed(2)} ${chartH.toFixed(2)}`}
                     stroke={"rgba(11,18,32,0.10)"}
                     strokeWidth={1}
                   />
                 ))}
                 {/* curve */}
                 <Path d={curvePath} stroke={COLORS.accent} strokeWidth={4} fill="none" strokeLinecap="round" />
               </Svg>
             </View>


             <View style={[styles.xAxisLabels, { width: chartW, alignSelf: "center" }]}>
               {xLabels.map((d) => (
                 <Text key={d} style={styles.xLabelLine} numberOfLines={1}>
                   {d}
                 </Text>
               ))}
             </View>
           </View>
         </View>


         <Text style={styles.last30} numberOfLines={1}>
           {mode === "daily" ? "Last 30 days" : "Last 7 weeks"}
         </Text>
       </View>
     </View>


     <View style={{ height: 28 }} />
   </ScreenWrap>
 );
}


/* -------------------- IMPROVE -------------------- */
function ImproveScreen() {
 return (
   <ScreenWrap>
     <SectionTitle title="Improve" subtitle="AI-powered posture insights" />


     <Pill
       icon={<Sparkles size={18} color={COLORS.accent} style={{ marginRight: 10 }} />}
       text={"On-device AI analyzed your posture patterns to\nprovide personalized suggestions"}
     />


     <Text style={styles.centerMuted} numberOfLines={1}>
       Last analyzed: Jan 23, 11:01 PM
     </Text>


     <View style={styles.insightCard}>
       <View style={styles.insightTopRow}>
         <View style={styles.iconBox}>
           <Clock size={20} color={COLORS.muted2} />
         </View>


         <View style={styles.insightTextCol}>
           <Text style={styles.insightTitle} numberOfLines={1}>
             Prolonged Slouching
           </Text>
           <Text style={styles.insightDesc} numberOfLines={2}>
             Slouch detected for 22 min{"\n"}during morning sessions
           </Text>
         </View>


         <Tag text="Focus" variant="accent" />
       </View>


       <View style={styles.aiRow}>
         <View style={[styles.aiIcon, { backgroundColor: COLORS.accentSoft }]}>
           <Sparkles size={18} color={COLORS.accent} />
         </View>
         <View style={styles.aiTextCol}>
           <Text style={styles.aiLabel} numberOfLines={1}>
             SUGGESTION
           </Text>
           <Text style={styles.aiText} numberOfLines={3}>
             Take a 2-minute standing break every 30 minutes{"\n"}to reset your posture
           </Text>
         </View>
       </View>
     </View>


     <View style={styles.insightCard}>
       <View style={styles.insightTopRow}>
         <View style={styles.iconBox}>
           <TrendingUp size={20} color={COLORS.muted2} />
         </View>


         <View style={styles.insightTextCol}>
           <Text style={styles.insightTitle} numberOfLines={1}>
             Afternoon Decline
           </Text>
           <Text style={styles.insightDesc} numberOfLines={2}>
             Alignment score drops by 15%{"\n"}after 3 PM
           </Text>
         </View>


         <Tag text="Focus" variant="accent" />
       </View>


       <View style={styles.aiRow}>
         <View style={[styles.aiIcon, { backgroundColor: COLORS.accentSoft }]}>
           <Sparkles size={18} color={COLORS.accent} />
         </View>
         <View style={styles.aiTextCol}>
           <Text style={styles.aiLabel} numberOfLines={1}>
             SUGGESTION
           </Text>
           <Text style={styles.aiText} numberOfLines={3}>
             Increase sensitivity after lunch or{"\n"}schedule a brief walk
           </Text>
         </View>
       </View>
     </View>


     <View style={{ height: 28 }} />
   </ScreenWrap>
 );
}


/* -------------------- DEVICE -------------------- */
function DeviceScreen() {
 const [sensitivity, setSensitivity] = useState(55);
 const [haptics, setHaptics] = useState(60);
 const sensitivityLabel = sensitivity < 34 ? "Low" : sensitivity < 67 ? "Medium" : "High";


 return (
   <ScreenWrap>
     <SectionTitle title="Device" subtitle="Manage your wearable" />


     <View style={styles.deviceHeaderCard}>
       <View style={styles.deviceLeft}>
         <View style={styles.btCircle}>
           <Bluetooth size={22} color={"#0B1220"} />
         </View>
         <View style={styles.deviceTextCol}>
           <Text style={styles.deviceName} numberOfLines={1}>
             Straight UP! Belt
           </Text>
           <Text style={styles.deviceStatus} numberOfLines={1}>
             Connected
           </Text>
         </View>
       </View>


       <View style={styles.activePill}>
         <Text style={styles.activePillText} numberOfLines={1}>
           ✓ Active
         </Text>
       </View>
     </View>


     <View style={styles.bigCard}>
       <View style={styles.cardHeaderRow}>
         <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
           <Zap size={18} color={COLORS.accent} style={{ marginRight: 10 }} />
           <Text style={styles.cardTitle} numberOfLines={1}>
             Battery Status
           </Text>
         </View>
       </View>


       <View style={styles.centerBlock}>
         <View style={styles.progressTrack}>
           <View style={[styles.progressFill, { width: "75%", backgroundColor: COLORS.accent }]} />
         </View>


         <View style={styles.progressMeta}>
           <Text style={styles.progressLabel} numberOfLines={1}>
             Level
           </Text>
           <Text style={[styles.progressLabel, { color: COLORS.text, fontWeight: "900" }]} numberOfLines={1}>
             75%
           </Text>
         </View>
       </View>
     </View>


     <View style={styles.bigCard}>
       <View style={styles.cardHeaderRow}>
         <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
           <RotateCcw size={18} color={COLORS.muted2} style={{ marginRight: 10 }} />
           <Text style={styles.cardTitle} numberOfLines={1}>
             Calibration
           </Text>
         </View>
       </View>


       <Text style={styles.cardBodyText} numberOfLines={3}>
         Recalibrate your device to establish your neutral{"\n"}posture baseline.
       </Text>


       <TouchableOpacity
         activeOpacity={0.9}
         style={styles.calibrateBtn}
         onPress={() => Alert.alert("Calibration", "Calibration started (demo).")}
       >
         <RotateCcw size={18} color="#FFFFFF" style={{ marginRight: 10 }} />
         <Text style={styles.calibrateText} numberOfLines={1}>
           Calibrate Device
         </Text>
       </TouchableOpacity>
     </View>


     <View style={styles.bigCard}>
       <Text style={styles.cardTitle} numberOfLines={1}>
         Posture Sensitivity
       </Text>


       <View style={styles.sliderMetaRow}>
         <Text style={styles.sliderLabel} numberOfLines={1}>
           Detection threshold
         </Text>
         <Text style={styles.sliderLabelRight} numberOfLines={1}>
           {sensitivityLabel}
         </Text>
       </View>


       <Slider
         value={sensitivity}
         onValueChange={setSensitivity}
         minimumValue={0}
         maximumValue={100}
         step={1}
         minimumTrackTintColor={COLORS.accent}
         maximumTrackTintColor={"rgba(11,18,32,0.15)"}
         thumbTintColor={COLORS.accent}
         style={{ marginTop: 10 }}
       />


       <View style={styles.sliderEnds}>
         <Text style={styles.sliderEndText} numberOfLines={1}>
           More tolerant
         </Text>
         <Text style={styles.sliderEndText} numberOfLines={1}>
           More strict
         </Text>
       </View>
     </View>


     <View style={styles.bigCard}>
       <Text style={styles.cardTitle} numberOfLines={1}>
         Haptic Feedback
       </Text>


       <View style={styles.sliderMetaRow}>
         <Text style={styles.sliderLabel} numberOfLines={1}>
           Vibration strength
         </Text>
         <Text style={styles.sliderLabelRight} numberOfLines={1}>
           {haptics}%
         </Text>
       </View>


       <Slider
         value={haptics}
         onValueChange={setHaptics}
         minimumValue={0}
         maximumValue={100}
         step={1}
         minimumTrackTintColor={COLORS.accent}
         maximumTrackTintColor={"rgba(11,18,32,0.15)"}
         thumbTintColor={COLORS.accent}
         style={{ marginTop: 10 }}
       />


       <View style={styles.sliderEnds}>
         <Text style={styles.sliderEndText} numberOfLines={1}>
           Off
         </Text>
         <Text style={styles.sliderEndText} numberOfLines={1}>
           Strong
         </Text>
       </View>


       <TouchableOpacity
         activeOpacity={0.9}
         style={[styles.outlineBtn, { marginTop: 14 }]}
         onPress={() => Alert.alert("Haptics", `Preview vibration strength: ${haptics}% (demo).`)}
       >
         <Zap size={16} color={COLORS.text} style={{ marginRight: 10 }} />
         <Text style={styles.outlineBtnText} numberOfLines={1}>
           Preview Haptics
         </Text>
       </TouchableOpacity>
     </View>


     <View style={{ height: 28 }} />
   </ScreenWrap>
 );
}


/* -------------------- PRIVACY -------------------- */
function PrivacyScreen() {
 const [pushOn, setPushOn] = useState(true);
 const [localOnly, setLocalOnly] = useState(true);
 const [autoDelete, setAutoDelete] = useState(false);


 return (
   <ScreenWrap>
     <SectionTitle title="Privacy & Account" subtitle="Your data, your control" />


     <Pill
       icon={<Shield size={18} color={COLORS.accent} style={{ marginRight: 10 }} />}
       text={"All your posture data stays on your device. No cloud\nstorage, no third-party access."}
     />


     <Text style={styles.sectionLabel} numberOfLines={1}>
       ACCOUNT SETTINGS
     </Text>


     <View style={styles.bigCard}>
       <View style={styles.accountHeaderCentered}>
         <User size={18} color={COLORS.muted2} style={{ marginRight: 10 }} />
         <Text style={styles.cardTitle} numberOfLines={1}>
           Account
         </Text>
       </View>


       <View style={styles.softPanel}>
         <Text style={styles.softPanelText} numberOfLines={2}>
           {"Create an optional account to sync settings\nacross devices (data stays local)"}
         </Text>


         <TouchableOpacity
           activeOpacity={0.9}
           style={styles.outlineBtn}
           onPress={() => Alert.alert("Create Account", "Account flow opened (demo).")}
         >
           <User size={16} color={COLORS.text} style={{ marginRight: 10 }} />
           <Text style={styles.outlineBtnText} numberOfLines={1}>
             Create Account (Optional)
           </Text>
         </TouchableOpacity>


         <TouchableOpacity
           activeOpacity={0.9}
           style={[styles.outlineBtn, { marginTop: 12 }]}
           onPress={() => Alert.alert("Paired Devices", "Manage paired devices opened (demo).")}
         >
           <Bluetooth size={16} color={COLORS.text} style={{ marginRight: 10 }} />
           <Text style={styles.outlineBtnText} numberOfLines={1}>
             Manage Paired Devices
           </Text>
         </TouchableOpacity>
       </View>


       {/* Keep toggle usable; center header + keep switch on right */}
       <View style={styles.toggleRow}>
         <View style={{ flex: 1, paddingRight: 10 }}>
           <Text style={styles.toggleTitle} numberOfLines={1}>
             Push Notifications
           </Text>
           <Text style={styles.toggleSub} numberOfLines={2}>
             Posture reminders and streak updates
           </Text>
         </View>
         <Switch
           value={pushOn}
           onValueChange={setPushOn}
           trackColor={{ false: "#D7DBE6", true: "rgba(61,242,255,0.35)" }}
           thumbColor={pushOn ? COLORS.accent : "#FFFFFF"}
         />
       </View>
     </View>


     <View style={styles.divider} />


     <Text style={styles.sectionLabel} numberOfLines={1}>
       PRIVACY CONTROLS
     </Text>


     <View style={styles.bigCard}>
       <View style={styles.accountHeaderCentered}>
         <Lock size={18} color={COLORS.muted2} style={{ marginRight: 10 }} />
         <Text style={styles.cardTitle} numberOfLines={1}>
           Data Storage
         </Text>
       </View>


       <View style={[styles.toggleRow, { marginTop: 10 }]}>
         <View style={{ flex: 1, paddingRight: 10 }}>
           <Text style={styles.toggleTitle} numberOfLines={1}>
             Local Storage Only
           </Text>
           <Text style={styles.toggleSub} numberOfLines={2}>
             Keep all data on this device only
           </Text>
         </View>
         <Switch
           value={localOnly}
           onValueChange={setLocalOnly}
           trackColor={{ false: "#D7DBE6", true: "rgba(61,242,255,0.35)" }}
           thumbColor={localOnly ? COLORS.accent : "#FFFFFF"}
         />
       </View>


       <View style={[styles.toggleRow, { marginTop: 10 }]}>
         <View style={{ flex: 1, paddingRight: 10 }}>
           <Text style={styles.toggleTitle} numberOfLines={1}>
             Auto-Delete Old Data
           </Text>
           <Text style={styles.toggleSub} numberOfLines={2}>
             Automatically remove data older than 90 days
           </Text>
         </View>
         <Switch
           value={autoDelete}
           onValueChange={setAutoDelete}
           trackColor={{ false: "#D7DBE6", true: "rgba(61,242,255,0.35)" }}
           thumbColor={autoDelete ? COLORS.accent : "#FFFFFF"}
         />
       </View>
     </View>


     <View style={{ height: 28 }} />
   </ScreenWrap>
 );
}


/* -------------------- APP ROOT -------------------- */
export default function App() {
 return (
   <GestureHandlerRootView style={{ flex: 1 }}>
     <NavigationContainer>
       <Tab.Navigator
         screenOptions={({ route }) => ({
           headerShown: false,
           tabBarShowLabel: true,
           tabBarActiveTintColor: COLORS.text,
           tabBarInactiveTintColor: "#98A6BD",
           tabBarLabelStyle: { fontSize: 12, marginBottom: 6, fontWeight: "800" },
           tabBarStyle: {
             height: Platform.OS === "ios" ? 78 : 72,
             paddingTop: 10,
             borderTopWidth: 1,
             borderTopColor: COLORS.border,
             backgroundColor: COLORS.card,
           },
           tabBarIcon: ({ color, focused }) => {
             const iconProps = { color, size: 22, strokeWidth: focused ? 2.6 : 2.2 };
             if (route.name === "Home") return <HomeIcon {...iconProps} />;
             if (route.name === "Sessions") return <BarChart2 {...iconProps} />;
             if (route.name === "Trends") return <TrendingUp {...iconProps} />;
             if (route.name === "Improve") return <Sparkles {...iconProps} />;
             if (route.name === "Device") return <Smartphone {...iconProps} />;
             if (route.name === "Privacy") return <Shield {...iconProps} />;
             return <HomeIcon {...iconProps} />;
           },
         })}
       >
         <Tab.Screen name="Home" component={HomeScreen} />
         <Tab.Screen name="Sessions" component={SessionsScreen} />
         <Tab.Screen name="Trends" component={TrendsScreen} />
         <Tab.Screen name="Improve" component={ImproveScreen} />
         <Tab.Screen name="Device" component={DeviceScreen} />
         <Tab.Screen name="Privacy" component={PrivacyScreen} />
       </Tab.Navigator>
     </NavigationContainer>
   </GestureHandlerRootView>
 );
}


const styles = StyleSheet.create({
 safe: { flex: 1, backgroundColor: COLORS.bg },
 scroll: { flex: 1, backgroundColor: COLORS.bg },
 scrollContent: { paddingTop: 18, paddingHorizontal: 22, paddingBottom: 30 },


 // Center everything INSIDE the content area you gave it
 pageCenter: { width: "100%", alignItems: "center" },


 sectionTitleWrap: { width: "100%", alignItems: "center", marginBottom: 12 },


 h1: {
   fontSize: IS_SMALL ? 34 : 40,
   lineHeight: IS_SMALL ? 38 : 44,
   fontWeight: "900",
   color: "#FFFFFF",
   letterSpacing: -0.4,
   textAlign: "center",
 },
 h2: {
   marginTop: 8,
   fontSize: IS_SMALL ? 18 : 20,
   lineHeight: IS_SMALL ? 24 : 26,
   fontWeight: "700",
   color: "rgba(255,255,255,0.72)",
   textAlign: "center",
 },


 centerBlock: { width: "100%", alignItems: "center", justifyContent: "center", marginTop: 10 },
 centerRow: { width: "100%", alignItems: "center", justifyContent: "center" },
 centerTextBlock: { alignItems: "center", justifyContent: "center", flexShrink: 1 },


 ringScore: { fontWeight: "900", color: COLORS.orange, letterSpacing: -1, textAlign: "center" },
 ringLabel: { marginTop: 8, fontSize: 16, fontWeight: "900", letterSpacing: 1.2, color: "rgba(255,255,255,0.75)", textAlign: "center" },


 alertBtn: {
   alignSelf: "center",
   marginTop: 6,
   flexDirection: "row",
   alignItems: "center",
   justifyContent: "center",
   paddingVertical: 12,
   paddingHorizontal: 20,
   borderRadius: 999,
   backgroundColor: "#FFF2C7",
   maxWidth: "100%",
 },
 alertIconWrap: { width: 22, height: 22, borderRadius: 11, alignItems: "center", justifyContent: "center", marginRight: 10 },
 alertTriangle: {
   width: 0,
   height: 0,
   borderLeftWidth: 7,
   borderRightWidth: 7,
   borderBottomWidth: 12,
   borderLeftColor: "transparent",
   borderRightColor: "transparent",
   borderBottomColor: "#B85D00",
   transform: [{ translateY: -1 }],
 },
 alertText: { fontSize: 18, fontWeight: "900", color: "#B85D00", textAlign: "center" },


 row2: { marginTop: 22, flexDirection: "row", justifyContent: "space-between", width: "100%" },


 smallCard: {
   width: "47.5%",
   backgroundColor: COLORS.card,
   borderRadius: 18,
   borderWidth: 1,
   borderColor: COLORS.border,
   paddingHorizontal: 16,
   paddingTop: 14,
   paddingBottom: 16,
   alignItems: "center",
   shadowColor: COLORS.shadow,
   shadowOpacity: 1,
   shadowRadius: 18,
   shadowOffset: { width: 0, height: 10 },
   elevation: 2,
 },
 smallCardIcon: { marginBottom: 10, alignItems: "center", justifyContent: "center" },
 smallCardValue: { fontSize: IS_SMALL ? 40 : 46, fontWeight: "700", color: COLORS.text, letterSpacing: -0.6, marginBottom: 4, textAlign: "center" },
 smallCardLabel: { fontSize: 14, fontWeight: "900", color: COLORS.muted, textAlign: "center" },


 bigCard: {
   backgroundColor: COLORS.card,
   borderRadius: 18,
   borderWidth: 1,
   borderColor: COLORS.border,
   padding: 18,
   marginTop: 16,
   width: "100%",
   shadowColor: COLORS.shadow,
   shadowOpacity: 1,
   shadowRadius: 18,
   shadowOffset: { width: 0, height: 10 },
   elevation: 2,
 },


 cardTitle: { fontSize: 20, fontWeight: "900", color: COLORS.text, textAlign: "center" },
 cardSub: { marginTop: 6, fontSize: 14, fontWeight: "800", color: COLORS.muted, textAlign: "center" },
 cardTopRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10 },


 latestStatsRow: { marginTop: 14, flexDirection: "row", justifyContent: "space-between", width: "100%" },
 latestStat: { flexDirection: "row", alignItems: "center", justifyContent: "center", width: "48%" },
 iconBadge: { width: 40, height: 40, borderRadius: 12, backgroundColor: COLORS.cardSoft, alignItems: "center", justifyContent: "center", marginRight: 12 },
 latestValue: { fontSize: 26, fontWeight: "900", color: COLORS.text, textAlign: "center" },
 latestLabel: { fontSize: 13, fontWeight: "900", color: COLORS.muted, marginTop: 2, textAlign: "center" },


 legendRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 12, gap: 14, flexWrap: "wrap" },
 legendItem: { flexDirection: "row", alignItems: "center" },
 dot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
 legendText: { fontSize: 13, fontWeight: "900", color: "#334155" },


 helperText: { marginTop: 8, fontSize: 13, fontWeight: "800", color: COLORS.muted, textAlign: "center" },


 // Sessions stacked chart
 stackChartWrap: { position: "relative", marginTop: 10 },
 stackGrid: { position: "absolute", left: 0, right: 0, top: 22 },
 gridH: { position: "absolute", left: 0, right: 0, height: 1, backgroundColor: "rgba(11,18,32,0.08)" },
 gridV: { position: "absolute", top: 0, bottom: 0, width: 1, backgroundColor: "rgba(11,18,32,0.08)" },
 stackChartRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", width: "100%" },
 stackGroup: { width: 46, alignItems: "center" },
 stackTop: { fontSize: 12, fontWeight: "900", color: COLORS.muted, marginBottom: 8, textAlign: "center" },
 stackTrack: { width: 20, borderRadius: 10, overflow: "hidden", backgroundColor: "rgba(11,18,32,0.06)" },
 stackLabel: { marginTop: 10, fontSize: 12, fontWeight: "900", color: COLORS.muted, textAlign: "center" },


 // Trends stat cards
 stats3Row: { flexDirection: "row", justifyContent: "space-between", marginTop: 8, width: "100%" },
 stats3Card: {
   width: "31.5%",
   borderRadius: 16,
   borderWidth: 1,
   borderColor: COLORS.border,
   backgroundColor: COLORS.card,
   padding: 14,
   alignItems: "center",
   shadowColor: COLORS.shadow,
   shadowOpacity: 1,
   shadowRadius: 16,
   shadowOffset: { width: 0, height: 8 },
   elevation: 2,
 },
 stats3Value: { marginTop: 10, fontSize: IS_SMALL ? 28 : 32, fontWeight: "900", color: COLORS.text, textAlign: "center" },
 stats3Label: { marginTop: 6, fontSize: 12, fontWeight: "900", color: COLORS.muted, textAlign: "center" },


 avgCard: {
   marginTop: 16,
   borderRadius: 18,
   borderWidth: 1,
   borderColor: "rgba(61,242,255,0.35)",
   backgroundColor: COLORS.accentSoft,
   padding: 16,
   width: "100%",
   flexDirection: "row",
   alignItems: "center",
   justifyContent: "space-between",
 },
 avgSmall: { fontSize: 14, fontWeight: "900", color: "#0B1220", textAlign: "center" },
 avgBig: { marginTop: 6, fontSize: IS_SMALL ? 46 : 54, fontWeight: "900", color: "#0B1220", letterSpacing: -1, textAlign: "center" },
 avgIconCircle: { width: 78, height: 78, borderRadius: 39, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: COLORS.border, alignItems: "center", justifyContent: "center" },


 segmentWrap: { marginTop: 14, backgroundColor: "rgba(11,18,32,0.06)", borderRadius: 999, padding: 6, flexDirection: "row" },
 segment: { flex: 1, paddingVertical: 10, borderRadius: 999, alignItems: "center", justifyContent: "center" },
 segmentActive: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: COLORS.border },
 segmentText: { fontSize: 14, fontWeight: "900", color: COLORS.muted, textAlign: "center" },
 segmentActiveText: { color: COLORS.text },


 chartCard: { backgroundColor: "#FFFFFF", borderRadius: 14, borderWidth: 1, borderColor: COLORS.border, padding: 8 },
 yLabelLine: { fontSize: 12, fontWeight: "900", color: COLORS.muted, textAlign: "right" },
 xAxisLabels: { marginTop: 10, flexDirection: "row", justifyContent: "space-between" },
 xLabelLine: { fontSize: 12, fontWeight: "900", color: COLORS.muted, textAlign: "center" },
 last30: { marginTop: 12, textAlign: "center", color: COLORS.muted, fontWeight: "900", fontSize: 13 },


 pill: {
   width: "100%",
   borderWidth: 1,
   borderRadius: 14,
   paddingVertical: 14,
   paddingHorizontal: 14,
   flexDirection: "row",
   alignItems: "center",
   justifyContent: "center",
   backgroundColor: COLORS.accentSoft,
   borderColor: "rgba(61,242,255,0.35)",
 },
 pillText: { fontSize: 14, fontWeight: "900", color: "#FFFFFF", lineHeight: 20, textAlign: "center", flexShrink: 1 },


 centerMuted: { marginTop: 12, textAlign: "center", fontSize: 13, fontWeight: "900", color: "rgba(255,255,255,0.72)" },


 insightCard: {
   marginTop: 14,
   backgroundColor: COLORS.card,
   borderRadius: 18,
   borderWidth: 1,
   borderColor: COLORS.border,
   padding: 16,
   width: "100%",
   shadowColor: COLORS.shadow,
   shadowOpacity: 1,
   shadowRadius: 18,
   shadowOffset: { width: 0, height: 10 },
   elevation: 2,
 },
 insightTopRow: { flexDirection: "row", alignItems: "flex-start" },
 iconBox: { width: 44, height: 44, borderRadius: 14, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: COLORS.border, alignItems: "center", justifyContent: "center" },
 insightTextCol: { flex: 1, marginLeft: 12, alignItems: "center" },
 insightTitle: { fontSize: 18, fontWeight: "900", color: COLORS.text, textAlign: "center" },
 insightDesc: { marginTop: 6, fontSize: 13, fontWeight: "900", color: COLORS.muted, lineHeight: 18, textAlign: "center" },


 tag: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, borderWidth: 1, marginLeft: 8 },
 tagText: { fontSize: 12, fontWeight: "900", textAlign: "center" },


 aiRow: { marginTop: 14, flexDirection: "row", alignItems: "flex-start" },
 aiIcon: { width: 38, height: 38, borderRadius: 12, alignItems: "center", justifyContent: "center", marginRight: 10 },
 aiTextCol: { flex: 1, alignItems: "center" },
 aiLabel: { fontSize: 12, fontWeight: "900", color: COLORS.muted, letterSpacing: 0.8, textAlign: "center" },
 aiText: { marginTop: 6, fontSize: 14, fontWeight: "900", color: "#0F172A", lineHeight: 20, textAlign: "center" },


 deviceHeaderCard: {
   marginTop: 10,
   backgroundColor: COLORS.card,
   borderRadius: 18,
   borderWidth: 1,
   borderColor: COLORS.border,
   padding: 18,
   width: "100%",
   flexDirection: "row",
   alignItems: "center",
   justifyContent: "space-between",
   shadowColor: COLORS.shadow,
   shadowOpacity: 1,
   shadowRadius: 18,
   shadowOffset: { width: 0, height: 10 },
   elevation: 2,
 },
 deviceLeft: { flexDirection: "row", alignItems: "center" },
 btCircle: { width: 54, height: 54, borderRadius: 27, backgroundColor: COLORS.accent, alignItems: "center", justifyContent: "center" },
 deviceTextCol: { marginLeft: 14, flexShrink: 1, alignItems: "center" },
 deviceName: { fontSize: 18, fontWeight: "900", color: COLORS.text, textAlign: "center" },
 deviceStatus: { marginTop: 6, fontSize: 13, fontWeight: "900", color: COLORS.muted, textAlign: "center" },
 activePill: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, backgroundColor: COLORS.accentSoft, borderWidth: 1, borderColor: "rgba(61,242,255,0.35)" },
 activePillText: { fontSize: 12, fontWeight: "900", color: "#0B1220", textAlign: "center" },


 cardHeaderRow: { flexDirection: "row", alignItems: "center", justifyContent: "center" },


 progressTrack: { height: 14, borderRadius: 999, backgroundColor: "rgba(11,18,32,0.12)", overflow: "hidden", width: "100%" },
 progressFill: { height: "100%", borderRadius: 999 },
 progressMeta: { marginTop: 12, flexDirection: "row", justifyContent: "space-between", width: "100%" },
 progressLabel: { fontSize: 13, fontWeight: "900", color: COLORS.muted, textAlign: "center" },


 cardBodyText: { marginTop: 12, fontSize: 13, fontWeight: "900", color: COLORS.muted, lineHeight: 18, textAlign: "center" },


 calibrateBtn: { marginTop: 14, borderRadius: 12, backgroundColor: "#0B1631", paddingVertical: 14, alignItems: "center", justifyContent: "center", flexDirection: "row" },
 calibrateText: { fontSize: 14, fontWeight: "900", color: "#FFFFFF", textAlign: "center" },


 sliderMetaRow: { marginTop: 12, flexDirection: "row", justifyContent: "space-between", width: "100%" },
 sliderLabel: { fontSize: 13, fontWeight: "900", color: COLORS.muted },
 sliderLabelRight: { fontSize: 13, fontWeight: "900", color: COLORS.text },
 sliderEnds: { marginTop: 8, flexDirection: "row", justifyContent: "space-between", width: "100%" },
 sliderEndText: { fontSize: 12, fontWeight: "900", color: "#94A3B8" },


 sectionLabel: { marginTop: 16, fontSize: 12, fontWeight: "900", letterSpacing: 1.2, color: "rgba(255,255,255,0.7)", textAlign: "center" },
 accountHeaderCentered: { flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" },


 softPanel: { marginTop: 12, backgroundColor: "#F8FAFF", borderRadius: 14, padding: 14, alignItems: "center" },
 softPanelText: { fontSize: 13, fontWeight: "900", color: "#475569", lineHeight: 18, textAlign: "center" },


 outlineBtn: {
   marginTop: 14,
   borderRadius: 12,
   borderWidth: 1,
   borderColor: "#C9D2E6",
   backgroundColor: "#FFFFFF",
   paddingVertical: 12,
   paddingHorizontal: 12,
   alignItems: "center",
   justifyContent: "center",
   flexDirection: "row",
   width: "100%",
 },
 outlineBtnText: { fontSize: 13, fontWeight: "900", color: COLORS.text, flexShrink: 1, textAlign: "center" },


 toggleRow: { marginTop: 14, backgroundColor: "#F8FAFF", borderRadius: 14, padding: 14, flexDirection: "row", alignItems: "center", width: "100%" },
 toggleTitle: { fontSize: 13, fontWeight: "900", color: COLORS.text },
 toggleSub: { marginTop: 6, fontSize: 12, fontWeight: "900", color: COLORS.muted, lineHeight: 16 },


 divider: { height: 1, backgroundColor: "rgba(255,255,255,0.12)", marginTop: 18, marginBottom: 6 },
});


