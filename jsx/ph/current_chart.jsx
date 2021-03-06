import React from 'react'
import {Tooltip, YAxis, XAxis, LineChart, Line, Label} from 'recharts'
import {ajaxGet} from '../utils/ajax.js'

export default class CurrentChart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      readings: {
        current: [],
        historical: [],
      }
    }
    this.fetch = this.fetch.bind(this)
  }

  componentDidMount () {
    var timer = window.setInterval(this.fetch, 10 * 1000)
    this.setState({timer: timer})
    this.fetch()
  }

  componentWillUnmount () {
    window.clearInterval(this.state.timer)
  }

  fetch () {
    ajaxGet({
      url: '/api/phprobes/'+this.props.probe_id+'/readings',
      success: function (data) {
        this.setState({
          readings: data,
        })
      }.bind(this)
    })
  }
  render () {
    if (this.state.readings.current.length <= 0) {
      return (<div />)
    }
    return (
      <div className='container'>
        <span className='h6'>Current</span>
        <LineChart width={this.props.width} height={this.props.height} data={this.state.readings.current}>
          <Line dataKey='pH' stroke='#33b5e5' isAnimationActive={false} dot={false}/>
          <XAxis dataKey='time' />
          <Tooltip />
          <YAxis />
        </LineChart>
      </div>
    )
  }
}
