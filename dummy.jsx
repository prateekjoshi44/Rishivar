// import React from 'react';
// import {
//     View,
//     Text,
//     FlatList,
//     StyleSheet,
//     TouchableOpacity,
// } from 'react-native';
// import { FontAwesome5, FontAwesome, AntDesign, Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';


// const HomeConcernContainer = props => {


//     const filterCategories = ['Love', 'Marriage', 'Career', 'Education', 'Children', 'Health', 'Litigation', 'Property', 'Investment']
//     const categoryIcons = [
//         <View style={styles.icons} >
//             <Feather name="heart" size={35} color='#F00D31' />
//         </View>,
//         <View style={{ ...styles.icons, ...{ alignItems: 'flex-start', width: '70%' } }} >
//             <FontAwesome5 name="hand-holding" size={35} color='#FFC19A' style={{ position: 'absolute', top: 13, left: 27, elevation: 5, transform: [{ rotate: '180deg' }] }} />
//             <FontAwesome5 name="hand-holding" size={35} color='#FFC19A' />
//         </View>,
//         <View style={styles.icons} >
//             <MaterialCommunityIcons name="stairs" size={40} color='#C57B00' />
//         </View>,
//         <View style={styles.icons} >
//             <FontAwesome5 name="university" size={35} color='#5481BE' />
//         </View>,
//         <View style={styles.icons} >
//             <MaterialIcons name="child-care" size={40} color='#FFC19A' />
//         </View>,
//         <View style={styles.icons} >
//             <MaterialCommunityIcons name="hospital-box" size={35} color='#37C801' />
//         </View>,
//         <View style={styles.icons} >
//             <FontAwesome name="legal" size={30} color='#302C29' />
//         </View>,
//         <View style={styles.icons} >
//             <AntDesign name="home" size={35} color='#BA4E0B' />
//         </View>,
//         <View style={{ ...styles.icons, ...{ paddingTop: 5 } }} >
//             <Text style={{ position: 'absolute', top: 14, elevation: 5, color: '#185A00' }} >₹</Text>
//             <FontAwesome5 name="money-bill" size={35} color='#185A00' />
//         </View>,
//         <View style={styles.icons} >
//             <Feather name="heart" size={35} color='#F00D31' />
//         </View>
//     ]
//     const iconsColors = [
//         '#F00D31',
//         '#09A481',
//         '#C57B00',
//         '#5481BE',
//         '#FFC19A',
//         '#37C801',
//         '#302C29',
//         '#BA4E0B',
//         '#185A00',
//     ]


//     // RENDER GRID ITEM
//     const renderGridItem = itemData => {
//         return (
//             <TouchableOpacity
//                 style={{ ...styles.label, ...{ borderColor: iconsColors[itemData.index] } }}
//                 onPress={() => props.navigation.navigate('Astrologer', { selectedFilterItems: [itemData.item] })}
//             >
//                 {
//                     categoryIcons[itemData.index]
//                 }
//                 <Text style={{ color: 'dimgrey' }} >{itemData.item}</Text>
//             </TouchableOpacity>
//         );
//     };

//     // RETURN FUNCTION
//     return (
//         <View style={styles.screen} >
//             <Text style={styles.titleText} >What's your concern ?</Text>
//             <View style={{ flexDirection: 'row' }} >
//                 <FlatList
//                     keyExtractor={(item, index) => '' + index}
//                     horizontal={true}
//                     data={filterCategories}
//                     renderItem={renderGridItem}
//                     showsHorizontalScrollIndicator={false}
//                 />
//             </View>
//         </View>
//     );
// }

// // STYLE SHEET
// const styles = StyleSheet.create({
//     screen: {
//         shadowColor: "black",
//         shadowOffset: { width: 0, height: 2 },
//         shadowRadius: 6,
//         shadowOpacity: 0.26,
//         elevation: 6,
//         borderRadius: 5,
//         backgroundColor: 'white',
//         marginTop: 10,
//         paddingTop: 10
//     },
//     label: {
//         shadowColor: "black",
//         shadowOffset: { width: 0, height: 2 },
//         shadowRadius: 6,
//         shadowOpacity: 0.26,
//         elevation: 4,
//         // borderWidth: 1,
//         borderRadius: 5,
//         paddingHorizontal: 5,
//         marginLeft: 5,
//         marginTop: 5,
//         textAlign: 'center',
//         width: 100,
//         backgroundColor: 'white',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginBottom: 10
//     },
//     icons: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',

//     },
//     titleText: {
//         marginLeft: 5,
//         color: 'dimgrey',
//         fontWeight: 'bold',
//         fontSize: 17
//     }
// });

// export default HomeConcernContainer;