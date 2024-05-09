import { FC, useEffect, useState } from "react";
import { FlatList, Text, StyleSheet, Button } from "react-native";
import StudentListRow from "./StudentListRow";
import StudentModel, { Student } from "../Model/StudentModel";

const StudentListPage: FC<{ navigation: any }> = ({ navigation }) => {
    const [data, setData] = useState<Student[]>([])
    const onItemSelected = (id: string) => {
        console.log('Item selected: ' + id);
        navigation.navigate('StudentDetailsPage', { id: id });
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
        console.log('focus')
        let students: Student[] = []
        try {
        students = await StudentModel.getAllStudents()
        } catch (err) {
        console.log("fail fetching students " + err)
        setData(Array<Student>())
        }
        setData(students)
        })
        return unsubscribe
        })


    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => navigation.navigate('StudentAddPage')}
                    title="Add"
                />
            ),
        })
    }, [])

    return (
        <FlatList
            style={styles.flatList}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <StudentListRow
                    name={item.name}
                    id={item.id}
                    imgUrl={item.imgUrl}
                    onItemSelected={onItemSelected}
                />
            )}
        />
    )
}

const styles = StyleSheet.create({
    flatList: {
        flex: 1,
    },
});

export default StudentListPage;