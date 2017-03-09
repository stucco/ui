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
                <EdgeResultsList type={'inEdges'} id={this.props.vertex.results._id} name={this.props.vertex.results.name} />
                <dt>Outgoing Edges</dt>
                <EdgeResultsList type={'outEdges'} id={this.props.vertex.results._id} name={this.props.vertex.results.name} />
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
