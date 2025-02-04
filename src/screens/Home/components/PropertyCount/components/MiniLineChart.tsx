import {useCaches} from '@src/constants/store';
import x from '@src/constants/x';
import React from 'react';
import {processColor, StyleSheet, Text, View} from 'react-native';
import {LineChart} from 'react-native-charts-wrapper';

interface MyProps {
  datas: number[];
}

const MiniLineChart: React.FC<MyProps> = props => {
  const {datas} = props;
  // console.log('MyChart datas.length: ', datas.length);
  const {theme} = useCaches();
  const y = {
    right: {
      enabled: false,
    },
    left: {
      enabled: true,
      drawGridLines: false,
      gridLineWidth: 1,
      drawAxisLine: true,
      drawLabels: true,
      labelCountForce: true,
      yOffset: 0,
      labelCount: 4,
      position: 'OUTSIDE_CHART',
      textSize: x.scale(10),
    },
  };
  const xAlias = {
    enabled: true,
    drawAxisLine: true,
    drawGridLines: false,
    position: 'BOTTOM',
    labelCount: 6,
    // valueFormatter: [],
    // axisMinimum: -1,
    // axisMaximum: 7,
    avoidFirstLastClipping: true,
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <LineChart
        style={{flex: 1, margin: 0, padding: 0}}
        yAxis={y}
        xAxis={xAlias}
        legend={{enabled: false}}
        scaleEnabled={false}
        data={{
          dataSets: [
            {
              values: datas,
              label: '',
              config: {
                lineWidth: 1,
                drawCircles: false,
                drawValues: datas.length <= 7,
                drawLabel: true,
                drawFilled: false,
                color: processColor(theme),
              },
            },
          ],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default MiniLineChart;
