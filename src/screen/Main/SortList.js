import { StyleSheet, Text, View, FlatList, SectionList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { data } from '../../constant/constant';

const SortList = () => {

    const [sortList, setSortList] = useState([]);
    const [sectionData, setSectionData] = useState([]);


    useEffect(() => {
        const list = data.sort(function (a, b) {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });

        const AZ = Array.from(Array(26)).map((_, i) => String.fromCharCode(i + 65));
        console.log(AZ);
        const sectionDataFilter = [];
        AZ.forEach(item => {
            const result = list.filter((user) => user.name.charAt(0).toUpperCase() == item)
            console.log(result);
            const rs = result.map((item) => item.name);
            if (rs.length > 0) {
                sectionDataFilter.push({
                    title: item,
                    data: rs
                })
            }
        });
        setSortList(list);
        console.log(sectionDataFilter);
        setSectionData(sectionDataFilter);

        return () => {

        }
    }, [])

    return (
        <View style={{ marginVertical: 15, marginHorizontal: 15 }}>
            {/* <FlatList
                data={sortList}
                keyExtractor={item => item.index}
                renderItem={({ item }) => (
                    <View style={{ height: 30 }}>
                        <Text style={{ fontSize: 18, color: 'red' }}>{item.name}</Text>

                    </View>
                )}
            /> */}

            <SectionList
                sections={sectionData}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    <View style={{ height: 30 }}>
                        <Text style={{ fontSize: 18, color: 'red' }}>{item}</Text>

                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={{fontSize:21,color:'black'}}>{title}</Text>
                )}
            />

        </View>
    )
}

export default SortList

const styles = StyleSheet.create({})