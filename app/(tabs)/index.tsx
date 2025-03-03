import { StyleSheet, ScrollView } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { Entypo } from '@expo/vector-icons';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function HomeScreen() {
    const [numberOfDays, setNumberOfDays] = useState(30)
    const [calendar, setCalendar] = useState<(Date | null)[][]>([])
    
    useEffect(() => {
        const days: Date[] = []
        const daysByWeek: (Date | null)[][] = []

        for (let i = numberOfDays; i > 0; i--) {
            const today = new Date()
            const newDate = new Date(today.setDate(today.getDate() - i))
            days.push(newDate)
        }

        let weeks = []
        for (let i = 0; i < days.length; i++) {
            const weekNumber = days[i].getDay()

            if (weekNumber <= 5) {
                weeks.push(days[i])

                if (i == (days.length - 1)) {
                    const newLoopNumber = 7 - weeks.length

                    for (let j = 0; j < newLoopNumber; j++) { weeks.push(null) }

                    daysByWeek.push(weeks)
                    weeks = []
                }
            } 

            if (weekNumber === 6) {
                weeks.push(days[i])

                if (weeks.length < 7) {
                    const newLoopNumber = 7 - weeks.length
                    for (let j = 0; j < newLoopNumber; j++) { weeks.unshift(null) }
                }

                daysByWeek.push(weeks)
                weeks = []
            }
        }

        setCalendar(daysByWeek)
    }, [numberOfDays])

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <ThemedView style={styles.headerView}>
                <ThemedText style={styles.headerInfo}>30 contributions in the last {numberOfDays} days</ThemedText>
                <ThemedView style={styles.headerFilter}>
                    <ThemedText style={styles.headerFilterText}>{numberOfDays} days </ThemedText>
                    <Entypo name="chevron-down" size={24} color="black" />
                </ThemedView>
            </ThemedView>

            <ThemedView style={styles.calendar}>
                <ThemedView style={styles.calendarHeader}>
                    {daysOfWeek.map(eachWeek => 
                        <ThemedView key={eachWeek} style={{ width: 35 }}>
                            <ThemedText style={{ textAlign: 'center' }}>{eachWeek.slice(0, 3)}</ThemedText>
                        </ThemedView>
                    )}
                </ThemedView>
                <ThemedView style={{ gap: 15 }}>
                    {calendar.map((eachWeek, eachWeekIndex) => 
                        <ThemedView style={styles.eachRow} key={eachWeekIndex}>
                            {eachWeek.map((eachDay, eachDayIndex) => {
                                if (eachDay === null) {
                                    return <ThemedView key={eachDayIndex} style={[styles.eachDay, styles.emptyDay]} />
                                }

                                return (
                                    <ThemedView key={eachDayIndex} style={styles.eachDay}>
                                        <ThemedText>{eachDay.getDate()}</ThemedText>
                                    </ThemedView>
                                )
                            })}
                        </ThemedView>
                    )}
                </ThemedView>
            </ThemedView>

            <ThemedView>
                <ThemedView style={styles.todayView}>
                    <ThemedText style={{ fontSize: 25 }}>Today</ThemedText>
                    <ThemedText style={styles.todayActivities}>8 activities</ThemedText>
                </ThemedView>
            </ThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerInfo: {
        fontSize: 25,
        maxWidth: '70%'
    },  
    headerFilter: {
        flexDirection: 'row',
        alignSelf: 'center',
        paddingVertical: 4,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderRadius: 999,
    },
    headerFilterText: {
        fontSize: 14
    },
    calendar: {
        padding: 20,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 30,
        marginBottom: 60
    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingBottom: 10,
        marginBottom: 20
    },
    emptyDay: {
        borderColor: 'transparent'
    },
    eachRow: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    eachDay: {
        width: 35,
        height: 35,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    todayView: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
    },
    todayActivities: {
        color: 'gray'
    }
});
