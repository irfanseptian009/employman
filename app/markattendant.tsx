import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import moment, { Moment } from "moment";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Define types for employee and attendance records
interface Employee {
  employeeId: string;
  employeeName: string;
  designation?: string;
  salary?: number;
}

interface Attendance {
  employeeId: string;
  status: string;
}

const MarkAttendance: React.FC = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState<Moment>(moment());

  const goToNextDay = () => {
    const nextDate = moment(currentDate).add(1, "days");
    setCurrentDate(nextDate);
  };

  const goToPrevDay = () => {
    const prevDate = moment(currentDate).subtract(1, "days");
    setCurrentDate(prevDate);
  };

  const formatDate = (date: Moment) => {
    return date.format("MMMM D, YYYY");
  };

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);

  // Fetch employee data
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:8000/employees");
        setEmployees(response.data);
      } catch (error) {
        console.log("Error fetching employee data", error);
      }
    };
    fetchEmployeeData();
  }, []);

  // Fetch attendance data based on the current date
  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get("http://10.0.2.2:8000/attendance", {
        params: {
          date: currentDate.format("MMMM D, YYYY"),
        },
      });
      setAttendance(response.data);
    } catch (error) {
      console.log("Error fetching attendance data", error);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [currentDate]);

  // Combine employee and attendance data
  const employeeWithAttendance = employees.map((employee) => {
    const attendanceRecord = attendance.find(
      (record) => record.employeeId === employee.employeeId
    );

    return {
      ...employee,
      status: attendanceRecord ? attendanceRecord.status : "", // Default status if not marked
    };
  });

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Pressable>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginLeft: "auto",
            marginRight: "auto",
            marginVertical: 20,
          }}
        >
          <AntDesign onPress={goToPrevDay} name="left" size={24} color="black" />
          <Text>{formatDate(currentDate)}</Text>
          <AntDesign onPress={goToNextDay} name="right" size={24} color="black" />
        </View>

        <View style={{ marginHorizontal: 12 }}>
          {employeeWithAttendance.map((item, index) => (
            <Pressable
              key={index}
              onPress={() =>
                router.push({
                  pathname: `./user/${item.employeeId}`,
                  params: {
                    name: item.employeeName,
                    id: item.employeeId,
                    salary: item?.salary,
                    designation: item?.designation,
                  },
                })
              }
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 8,
                  padding: 10,
                  backgroundColor: "#4b6cb7",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  {item?.employeeName?.charAt(0)}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item?.employeeName}
                </Text>
                <Text style={{ marginTop: 5, color: "gray" }}>
                  {item?.designation} ({item?.employeeId})
                </Text>
              </View>
              {item?.status && (
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                    padding: 10,
                    backgroundColor: "#FF69B4",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 16, color: "white", fontWeight: "bold" }}>
                    {item.status.charAt(0)}
                  </Text>
                </View>
              )}
            </Pressable>
          ))}
        </View>
      </Pressable>
    </View>
  );
};

export default MarkAttendance;

const styles = StyleSheet.create({});
