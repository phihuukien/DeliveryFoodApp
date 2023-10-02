import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Separator } from '../components';
import { PermissionsAndroid, Pressable, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native';
import ReviewService from '../services/ReviewService';
import { useSelector } from 'react-redux';
import { StaticImageService } from '../services';
import { ApiContants } from '../contants';

const ReviewActionScreen = ({ navigation, route }: any) => {
    const { orderId } = route.params
    const [food, setFood] = useState<any>();
    const [foodIdList, setFoodIdList] = useState<Array<string> | undefined>(undefined);

    useEffect(() => {
        ReviewService.getReviewItem(orderId).then((response: any) => {
            setFood(response?.ordersDetail);
            setFoodIdList(response?.foodIdList);
        });
    }, []);

    const userData = useSelector(
        (state: any) => state?.generalState.userData,
    );
    const [commentText, setCommentText] = useState("");
    const [defaultRating, setDefaultRating] = useState(1);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const [images, setImages] = useState<string[]>([]);

    const starImgFilled = 'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true'
    const starImgCorner = 'https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true'

    const [finalImg, setFinalImg] = useState<any[]>([]);
    const sendReview = () => {
        const formData = new FormData();

        formData.append("Context", commentText)
        formData.append("username", userData.username)
        formData.append("Rate", defaultRating)
        formData.append("OrderId", orderId)

        finalImg.forEach((image) => {
            let imageType = "";
            if (image.type === "image/jpg" || image.Type === "image/jpeg" || image.Type === "image/png") {
                imageType = image.type;
            } else {
                imageType = "image/jpeg";
            }
            const img = {
                "name": image.filename,
                "type": image.type,
                "uri": image.uri
            }
            formData.append("ReviewImg", img);
        });

        foodIdList?.forEach((item, index) => {
            formData.append("FoodId", item)
        });

        ReviewService.addReview(formData).then((response) => {
            if (response.status == true) {

                navigation.navigate('HomeTabs')
            }
        })
    }

    const takePics = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED && images.length < 5) {
                const remainingLimit = 5 - images.length;
                launchImageLibrary(
                    { mediaType: 'photo', selectionLimit: remainingLimit, quality: 1, includeBase64: true },
                    (response) => {
                        if (response.assets && response.assets.length > 0) {
                            const newImages: any = response.assets.map((asset) => ({
                                uri: asset.uri,
                                filename: asset.fileName,
                                type: "image/jpg" || "image/jpeg" || "image/png"
                            }));
                            const addImages = newImages.slice(0, remainingLimit);
                            setImages((prevImages) => prevImages.concat(addImages));
                            setFinalImg((prevFinalImg) => prevFinalImg.concat(addImages));
                        }
                    }
                );
            }
        } catch (error) {
            console.error('Error occurred while requesting camera permission:', error);
        }
    };

    const deleteImage = (index: number) => {
        setImages((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages.splice(index, 1);
            setFinalImg(updatedImages);
            return updatedImages;
        });
    };

    const CustomRatingBar = () => {
        const ratings = ['Very bad', 'Bad', 'Good', 'Very good', 'Excellent'];

        const handleRatingPress = (rating: any) => {
            setDefaultRating(rating);
        };

        return (
            <View style={styles.customRatingBar}>
                {maxRating.map((item, key) => {
                    const isSelected = item === defaultRating;
                    return (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            key={item}
                            onPress={() => handleRatingPress(item)}
                        >
                            <Image
                                style={styles.starImgStyle}
                                source={
                                    item <= defaultRating ? { uri: starImgFilled } : { uri: starImgCorner }
                                }
                            />
                        </TouchableOpacity>
                    );
                })}
                {defaultRating !== null && (
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ color: 'grey', fontSize: 16, fontWeight: 'bold' }}>{ratings[defaultRating - 1]}</Text>
                    </View>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />

            <Separator height={StatusBar.currentHeight} />

            <View style={styles.headerTitle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <Ionicons
                        name="chevron-back-outline"
                        color={'black'}
                        size={35}
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={styles.titleName}>Review</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={sendReview}>
                        <Text style={styles.sendButton}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                {food?.map((item: any, index: any) => (
                    <View key={index} style={styles.reviewItemContainer}>
                        <Image
                            style={styles.itemImage}
                            source={{
                                uri: StaticImageService.getGalleryImage(
                                    item?.foods[0].image,
                                    ApiContants.STATIC_IMAGE.SIZE.SQUARE,
                                ),
                            }}
                            key={item?.id}
                        />
                        <Text>
                            <Text style={styles.itemName}>{item.foods[0].name}</Text>
                            {'\n'}
                            <Text style={{ fontSize: 16 }}>Category: {item?.foods[0].category}</Text>
                        </Text>
                    </View>
                ))}

                <View style={styles.ratingContainer}>
                    <Text style={styles.itemQuality}>
                        Quality:
                    </Text>
                    <CustomRatingBar />
                </View>

                <View>
                    <TouchableOpacity style={styles.addImageButton}
                        onPress={takePics}
                    >
                        <Ionicons
                            name="camera"
                            color={'black'}
                            size={35}
                        />
                        <Text>Add Image</Text>
                    </TouchableOpacity>
                    <View style={styles.reviewImgContainer}>
                        {images &&
                            images.map((image: any, index: any) => (
                                <View key={index}>
                                    <Image source={{ uri: image.uri }} style={styles.reviewImg} />
                                    <Pressable
                                        style={styles.deleteButton}
                                        onPress={() => deleteImage(index)}
                                    >
                                        <Ionicons
                                            name="close"
                                            color={'white'}
                                            size={25}
                                        />
                                    </Pressable>
                                </View>
                            ))}
                    </View>
                </View>

                <View>
                    <TextInput value={commentText}
                        onChangeText={setCommentText}
                        placeholder='Share your feeling to this food !' style={styles.reviewText}></TextInput>
                </View>
            </ScrollView>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerTitle: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleName: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    },
    sendButton: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        marginRight: 10
    },
    reviewItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 0.5
    },
    itemImage: {
        width: 60,
        height: 60,
        marginRight: 10
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    customRatingBar: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20
    },
    ratingContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    itemQuality: {
        marginRight: 20,
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'
    },
    starImgStyle: {
        width: 30,
        height: 30,
        resizeMode: 'cover'
    },
    addImageButton: {
        borderWidth: 1,
        alignItems: 'center',
        borderColor: 'black',
        padding: 10,
        marginLeft: 10,
        marginRight: 10
    },
    reviewImgContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    reviewImg: {
        width: 90,
        height: 90,
        marginTop: 10,
        marginLeft: 10
    },
    deleteButton: {
        position: 'absolute', top: 10, right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    reviewText: {
        borderWidth: 1,
        padding: 10,
        margin: 10,
        height: 300,
        textAlignVertical: 'top'
    }
});

export default ReviewActionScreen;