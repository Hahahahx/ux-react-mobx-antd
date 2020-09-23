import sha256_digest from "@/utils/js-sha256";

export enum UploadFileStatus {
    Pending,
    OnGoing,
    Failure,
    Repeat,
    Success
}

export class UploadFile {
    /**
     * 文件
     */
    file: File
    /**
     * 切片总数
     */
    pieceCount: number
    /**
     * 切片区间列表
     */
    pieceList: Array<{ start: number, end: number }> = []
    /**
     * 已上传切片区间列表
     */
    uploadedPieceList: Array<number> = []
    /**
     * 分片大小
     */
    pieceSize: number
    /**
     * 上传状态
     */
    status: UploadFileStatus = UploadFileStatus.Pending
    /**
     * 上传百分比
     */
    percent: number = 0
    /**
     * 预处理id
     */
    id!: string
    /** 
     * 预处理key
     */
    key!: string
    /**
     * 上传的文件夹
     */
    pid: number


    /**
     * 初始化
     * @param file 文件 
     * @param pieceSize 分片大小 
     */
    constructor(file: File, pieceSize: number, pid: number) {
        this.pid = pid;
        this.file = file;
        this.pieceSize = pieceSize;
        this.pieceCount = Math.ceil(file.size / pieceSize);
        let start = 0;
        let end = 0;
        // 切片区间
        while (start < file.size) {
            end = start + pieceSize;
            if (end > file.size) {
                end = file.size;
            }
            this.pieceList.push({ start, end })
            start = end;
        }
    }

    /**
     * 计算指纹
     */
    async getFinger() {

        /**
         * 得到文件二进制数据流
         * 将文件大小也转换成二进制数据流
         */

        const fileBinarry = new Uint8Array(await fileGetArrayBuffer(this.file))
        const sizeBinary = new TextEncoder().encode(this.file.size + '')

        /**
         * 判断文件大小是否64位
         * 否：将文件二进制流与文件大小二进制流拼接
         * 是：取前中后三段文件二进制流再将他们与文件大小二进制流拼接
         * 对结果sha256加密
         */
        if (this.file.size <= 64 * 1024) {
            const fingerBinary = mergeUnit8Array([fileBinarry, sizeBinary])
            return sha256_digest(fingerBinary)
        } else {
            const startBinary = fileBinarry.slice(0, 64 * 1024)
            const middleBinary = fileBinarry.slice(this.file.size / 2 - 32 * 1024, 64 * 1024)
            const endBinary = fileBinarry.slice(-64 * 1024)
            const fingerBinary = mergeUnit8Array([startBinary, middleBinary, endBinary, sizeBinary])
            return sha256_digest(fingerBinary)
        }


    }

    async getFileBlob() {
        return await fileGetArrayBuffer(this.file)
    }


    /**
     * 获取切片文件块
     * @param index 任意分块
     */
    async getChunk(index: number): Promise<ArrayBuffer> {
        console.log(this.getFileBlob())
        const piece = this.pieceList[index]
        return (await this.getFileBlob()).slice(piece.start, piece.end)

    }

    async getChunks(): Promise<ArrayBuffer[]> {
        const fileBlob = (await this.getFileBlob())
        return this.pieceList.reduce((chunkList, item) => {
            chunkList.push(fileBlob.slice(item.start, item.end))
            return chunkList;
        }, new Array<ArrayBuffer>())
    }

    /**
     * 成功时进度为100
     * @param status 上传状态
     */
    setStatus(status: UploadFileStatus) {
        this.status = status
        if (status === UploadFileStatus.Success) {
            this.percent = 100
        }
    }

    /**
     * 
     * @param index 当前上传分片序号
     */
    setPercent() {
        this.percent = Number(this.uploadedPieceList.length / this.pieceCount * 100);
    }

}

// 获取文件的arraybuffer
export function fileGetArrayBuffer(file: File): Promise<ArrayBuffer> {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)

    return new Promise((resovle, reject) => {
        reader.onload = function () {
            if (reader.result) {
                resovle(reader.result as ArrayBuffer)
            } else {
                reject(reader.result)
            }
        }
    })

}

// 合并unit8Array
export function mergeUnit8Array(arrays: Array<Uint8Array>) {
    let totalLen = 0
    for (let i = 0; i < arrays.length; i++) {
        totalLen += arrays[i].length
    }

    let res = new Uint8Array(totalLen)

    let offset = 0
    for (let arr of arrays) {
        res.set(arr, offset)
        offset += arr.length
    }

    return res.buffer
}