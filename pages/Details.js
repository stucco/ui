import React from 'react'
import prettyData from 'pretty-data'
import fileDownload from 'react-file-download'
import cx from 'classnames'

import { getNode } from '../helpers/StuccoApi'
import { ADD_TO_REPORT, CLEAR_REPORT } from '../redux/actions'
import { buildReport } from '../helpers/ReportBuilder'
import { connect } from 'react-redux'

import Property from '../components/Property'
import EdgeResultsList from '../components/EdgeResultsList'
import SourceDocument from '../components/SourceDocument'
import Layout from '../components/Layout'

import stix from 'raw-loader!../stix-to-html/stix.html'

class Details extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showStix: false
    }

    this.handleShowStix = this.handleShowStix.bind(this)
  }
  componentWillUnmount () {
    if (window.localStorage.getItem('report') !== null) {
      window.localStorage.removeItem('report')
    }
  }
  handleShowStix () {
    this.setState({
      showStix: !this.state.showStix
    })
  }
  mapObject (object, callback) {
    return Object.keys(object).map(function (key) {
      return callback(key, object[key])
    })
  }

  render () {
    const prettySourceDocument = prettyData.pd.xml(this.props.vertex.results.sourceDocument)
    const vertexName = this.props.vertex.results.name
    const id = this.props.vertex.results._id
    const dispatch = this.props.dispatch
    const report = this.props.report
    let color
    function handleDownloadStix () {
      fileDownload(prettySourceDocument, vertexName + '.xml')
    }
    function handleAddToReport () {
      dispatch(ADD_TO_REPORT(prettySourceDocument, id))
    }
    function handleClearReport () {
      dispatch(CLEAR_REPORT)
    }
    function handleDownloadReport () {
      if (report !== null && report !== undefined && Object.keys(report).length !== 0) {
        var prettyReport = prettyData.pd.xml(buildReport(report))
        fileDownload(prettyReport, 'stix-report.xml')
      }
    }
    function handleShowReport () {
      var prettyReport = prettyData.pd.xml(buildReport(report))
      window.localStorage.setItem('report', prettyReport)
    }
    if (this.props.vertex.results.hasOwnProperty('score')) {
      if (this.props.vertex.results.score < 0.1) 
        color = "#999"
      else if (this.props.vertex.results.score < 0.2)
        color = "#666"
      else if (this.props.vertex.results.score < 0.6)
        color = "ffa500"
      else  
        conlor = "#f00"
    }
    return (
      <Layout className='container-fluid'>
        <section className={cx('page', 'alert-details')}>
          <div className={cx('panel', 'panel-primary')}>
            <div className='panel-heading'>
              <div className='pull-right'>
                <button type='button' aria-label='Close' className='close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <h3 className='panel-title'>
                <span >{this.props.vertex.results.vertexType}</span>
                <span>&nbsp; ⟶ &nbsp;</span>
                <span >{this.props.vertex.results.name}</span>
              </h3>
            </div>
            <div className='panel-body'>
              <div className="row" style={{alignItems: 'center', display: 'flex'}}>
                <div className="col-md-10">
                  <dl className='dl-horizontal'>
                    <dt>Name</dt>
                    <dd >{this.props.vertex.results.name}</dd>
                    <dt>Description</dt>
                    <dd >{this.props.vertex.results.description}</dd>
                    <span >
                      {
                        this.mapObject(this.props.vertex.results, function (key, value) {
                          if (key !== 'description' && key !== 'name' && key !== 'sourceDocument' && key !== '_id') {
                            if (value.dtructor === Array) {
                              value = value.toString()
                            }
                            return <Property key={key} propertyName={key} propertyValue={value} />
                          }
                        })
                      }
                    </span>
                  </dl>
                </div>
                {
                  (this.props.vertex.results.hasOwnProperty("score")) ?
                    <div className={cx("col-xs-1", "col-md-2", "text-center")}>
                      <div style={{lineHeight: '150%', verticalAlign: 'middle', fontSize: '2vw'}}>
                        <span style={{color: color}}><strong>{this.props.vertex.results.score}</strong></span>
                      </div>
                    </div> : null   
                }
              </div>
              <dl className='dl-horizontal'>
                <dt>Source Document</dt>
                <dd>
                  <table style={{textAlign: 'left', width: '450px', height: '70px'}}>
                    <tbody >
                      <tr>
                        <td>
                          <form>
                            <input type='checkbox' style={{marginRight: '5px'}} onClick={this.handleShowStix} />
                            Show STIX
                          </form>
                        </td>
                        <td>
                          <button className={cx('btn', 'btn-default')} onClick={handleDownloadStix}>
                            <span aria-hidden='true' className={cx('glyphicon', 'glyphicon-download')}></span>
                            Download STIX
                          </button>
                        </td>
                      </tr>
                    </tbody >
                  </table>
                  <div role='group' className='btn-group'>
                    <a className={cx('btn', 'btn-default')} onClick={handleAddToReport}>
                      <span aria-hidden='true' className={cx('glyphicon', 'glyphicon-plus')}></span>
                      Add To Report
                    </a>
                    <a className={cx('btn', 'btn-default')} onClick={handleClearReport}>
                      <span aria-hidden='true' className={cx('glyphicon', 'glyphicon-remove')}></span>
                      Clear Report
                    </a>
                    <a className={cx('btn', 'btn-default')} onClick={handleDownloadReport}>
                      <span aria-hidden='true' className={cx('glyphicon', 'glyphicon-download-alt')}></span>
                      Download Report
                    </a>
                    <a href='../stix-to-html/stix.html' target='_blank' className={cx('btn', 'btn-default')} role='button' onClick={handleShowReport}>
                      <span aria-hidden='true' className={cx('glyphicon', 'glyphicon-book')}></span>
                      Show Report
                    </a>
                  </div>
                  <div>
                    {this.state.showStix ? <SourceDocument sourceDocument={prettySourceDocument} /> : null}
                  </div>
                </dd>
                <dt>&nbsp;</dt>
                <dd>&nbsp;</dd>
                <dt>Incoming Edges</dt>
                <EdgeResultsList type={'inEdges'} source={this.props.route.params.source} id={this.props.vertex.results._id} name={this.props.vertex.results.name} vertexType={(this.props.vertex.results.hasOwnProperty('observableType') && (this.props.vertex.results.vertexType !== 'IP')) ? this.props.vertex.results.observableType : this.props.vertex.results.vertexType} />
                <dt>Outgoing Edges</dt>
                <EdgeResultsList type={'outEdges'} source={this.props.route.params.source} id={this.props.vertex.results._id} name={this.props.vertex.results.name} vertexType={(this.props.vertex.results.hasOwnProperty('observableType') && (this.props.vertex.results.vertexType !== 'IP')) ? this.props.vertex.results.observableType : this.props.vertex.results.vertexType} />
              </dl>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

Details.propTypes = {
  vertex: React.PropTypes.object,
  report: React.PropTypes.object,
  dispatch: React.PropTypes.func
}

const mapStateToProps = function (store) {
  return {
    report: store.report
  }
}

export default connect(mapStateToProps)(Details)
